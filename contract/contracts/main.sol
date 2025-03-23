// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract NFTCertificatePlatform {
    
    enum Role { Stranger, User, Organization, Admin }

    struct Profile {
        string name;  
        address walletAddress;
    }

    struct Certificate {
        address owner;
        address issuer;
        string ipfsHash;
        uint256 timestamp; 
    }

    mapping(address => Profile) public profiles;
    mapping(address => Role) public roles; 
    mapping(bytes32 => Certificate) public certificates;
    mapping(address => bytes32[]) public userCertificates;
    mapping(bytes32 => address[]) public certificateEndorsements; // Stores endorsers per certificate
    mapping(address => bytes32[]) public userEndorsements; // Stores certificates endorsed by a user

    event SignedUp(address indexed wallet, string name, Role role);
    event RoleAssigned(address indexed user, Role newRole);
    event RoleRevoked(address indexed user);
    event CertificateMinted(bytes32 indexed tokenId, address indexed owner, address indexed issuer, uint256 timestamp);
    event CertificateEndorsed(bytes32 indexed tokenId, address indexed endorser);

    address public owner;

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin;
        profiles[msg.sender] = Profile({
            name: "Platform Owner",
            walletAddress: msg.sender
        });
    }

    function signUp(string memory _name, Role _role) external {
        require(roles[msg.sender] == Role.Stranger, "Already registered");
        require(_role == Role.User || _role == Role.Organization, "Invalid role");

        profiles[msg.sender] = Profile({
            name: _name,
            walletAddress: msg.sender
        });

        roles[msg.sender] = _role; 

        emit SignedUp(msg.sender, _name, _role);
    }

    function assignRole(address _user, Role _newRole) external onlyAdmin {
        require(roles[_user] != Role.Admin, "Cannot modify another admin");
        roles[_user] = _newRole;
        emit RoleAssigned(_user, _newRole);
    }

    function revokeRole(address _user) external onlyAdmin {
        require(roles[_user] != Role.Admin, "Cannot revoke admin role");
        roles[_user] = Role.Stranger;
        emit RoleRevoked(_user);
    }

    function mintCertificate(address _owner, string memory _ipfsHash) external {
        require(roles[msg.sender] == Role.Organization, "Only organizations can mint certificates");
        require(roles[_owner] == Role.User, "Recipient must be a registered user");

        bytes32 tokenId = keccak256(abi.encodePacked(msg.sender, _owner, profiles[_owner].name, _ipfsHash));

        require(certificates[tokenId].owner == address(0), "Certificate already exists");

        certificates[tokenId] = Certificate({
            owner: _owner,
            issuer: msg.sender,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp // ⏳ Store timestamp
        });

        certificateEndorsements[tokenId].push(msg.sender); // Auto-endorse by issuer
        userCertificates[_owner].push(tokenId);

        emit CertificateMinted(tokenId, _owner, msg.sender, block.timestamp);
    }

    function endorseCertificate(bytes32 _tokenId) external {
        require(roles[msg.sender] != Role.Stranger, "Only registered users can endorse");
        require(certificates[_tokenId].owner != address(0), "Certificate does not exist");
        require(msg.sender != certificates[_tokenId].owner, "Cannot endorse own certificate");

        // Check if user already endorsed
        for (uint i = 0; i < certificateEndorsements[_tokenId].length; i++) {
            require(certificateEndorsements[_tokenId][i] != msg.sender, "Already endorsed");
        }

        certificateEndorsements[_tokenId].push(msg.sender);
        userEndorsements[msg.sender].push(_tokenId);

        emit CertificateEndorsed(_tokenId, msg.sender);
    }

    function getUserCertificates(address _user) external view returns (bytes32[] memory) {
        return userCertificates[_user];
    }

    function getUserEndorsements(address _user) external view returns (bytes32[] memory) {
        return userEndorsements[_user];
    }

    function getEndorsers(bytes32 _tokenId) external view returns (address[] memory) {
        return certificateEndorsements[_tokenId];
    }

    function verifyCertificate(address _owner, string memory _ipfsHash, bytes32 _tokenId) external view returns (bool) {
        require(_owner != address(0), "Owner must be set");
        require(certificates[_tokenId].owner == _owner, "Certificate does not exist for the provided owner");
        return keccak256(abi.encodePacked(_ipfsHash)) == keccak256(abi.encodePacked(certificates[_tokenId].ipfsHash));
    }
    function getRole() external view returns (Role) {
        return roles[msg.sender];
    }
}
