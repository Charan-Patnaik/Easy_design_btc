(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-non-fungible-token desing-nft uint)

;; Data variable to hold the next available design ID
(define-data-var next-design-id uint u1)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

;; Define roles
(define-constant role-designer "designer")
(define-constant role-buyer "buyer")


;; Simulated NFT token storage, associating a design ID with a token ID
(define-map design-nft-tokens
    {design-id: uint}
    {token-id: uint})


(define-data-var design-data
    ;; Tuple type definition:
    {
        designer: (optional principal),
        design-id: uint,
        status: (string-ascii 10)
    }
    ;; Tuple value:
    {
        designer: none,
        design-id: u0,
        status: "none"
    }
)

;; Definition of a map called "designs" that stores design records.
(define-map designs
    {design-id: uint}  ;; The key type, represented as a tuple with a "design-id" of unsigned integer type.
    {designer: (optional principal),  ;; The value type, represented as a tuple consisting of:
     design-id: uint,                ;; - design-id: an unsigned integer identifying the design.
     status: (string-ascii 10)})     ;; - status: a string (ASCII) describing the design status, limited to 10 characters.


(define-map users
    {user-principal: principal}
    {role: (string-ascii 10)}
)


;; Create user i.e designer (or) buyer
(define-public (create-user (user-principal principal) (role (string-ascii 10)))
    (begin
        (asserts! (or (is-eq role role-designer) (is-eq role role-buyer))
                  (err "Invalid role specified"))
        (map-insert users {user-principal: user-principal} {role: role})
        (ok "User created successfully")
    )
)


;; Verify if the role is designer
(define-read-only (is-designer (user-principal principal))
    (let ((role (map-get? users {user-principal: user-principal})))
        (match role
            role-entry (is-eq (get role role-entry) role-designer) ;; if the role exists, check if it's 'designer'
            false                                                  ;; if no role is found, return false
        )
    )
)

;; Verify if the role is buyer
(define-read-only (is-buyer (user-principal principal))
    (let ((role (map-get? users {user-principal: user-principal})))
        (match role
            role-entry (is-eq (get role role-entry) role-buyer) ;; if the role exists, check if it's 'buyer'
            false                                              ;; if no role is found, return false
        )
    )
)

(define-public (submit-design (design-id uint))
    (if (is-designer tx-sender)
        (let ((existing-design (map-get? designs {design-id: design-id})))
            (if (is-none existing-design)
                (begin
                    (map-insert designs
                        {design-id: design-id}
                        {designer: (some tx-sender), design-id: design-id, status: "designing"})
                    (ok design-id))
                (err u"Design already exists")))
        (err u"Unauthorized: Only designers can submit designs"))
)







(define-read-only (get-user-role (user-principal principal))
    (map-get? users {user-principal: user-principal})
)


;; Private function to update the status of a design record based on the design-id
(define-private (update-design-status (design-id uint) (new-status (string-ascii 10)))
    (let ((existing-design (map-get? designs {design-id: design-id})))
        (match existing-design
            design-record
                (let ((updated-design (merge design-record {status: new-status})))
                    (map-set designs
                        {design-id: design-id}
                        updated-design)
                    (ok "Status updated"))
            (err "Design does not exist"))))

;; Public function to change the status of a design to "approved"
(define-public (approve-design (design-id uint))
    (update-design-status design-id "approved"))

;; Public function to change the status of a design to "sampling"
(define-public (sample-design (design-id uint))
    (update-design-status design-id "sampling"))


;; Helper function to check if the sender is the owner
(define-private (is-owner (sender principal))
    (is-eq sender contract-owner))

;; Function to mint NFT
;; (define-private (mint-nft (design-id uint) (token-id uint))
;;     (map-insert design-nft-tokens
;;         {design-id: design-id}
;;         {token-id: token-id})
;;     (ok token-id))


(define-private (mint-nft (design-id uint) (token-id uint))
    (let ((entry (map-insert design-nft-tokens
                             {design-id: design-id}
                             {token-id: token-id})))
        (if entry
            (ok token-id)  ;; Successful insertion, return the token-id
            (err "Token ID already exists for this design ID"))))  ;; Key already exists, handle error



(define-public (close-design (design-id uint))
    (if (is-owner tx-sender)
        (let ((status-updated (update-design-status design-id "closed")))
            (match status-updated
                success
                    (let ((token-id (var-get next-design-id)))
                        ;; Check the response of mint-nft before proceeding
                        (let ((minting-result (mint-nft design-id token-id)))
                            (match minting-result
                                ok-token-id
                                    ;; If minting is successful, increment the token ID
                                    (begin
                                        (var-set next-design-id (+ token-id u1))
                                        (ok ok-token-id))
                                error-message
                                    ;; If minting fails, return the error
                                    (err error-message))))
                failure
                    (err "Failed to update design status or design does not exist")))
        (err "Unauthorized: Only the contract owner can mint NFTs")))


;; Function to retrieve the last minted token ID, adjusted to reflect the last used ID
(define-read-only (get-last-token-id)
    (ok (- (var-get next-design-id) u1)))


(define-read-only (get-token-uri (token-id uint))
    (ok none)
)

(define-read-only (get-owner (token-id uint))
    (ok (nft-get-owner? desing-nft token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (nft-transfer? desing-nft token-id sender recipient)
    )
)