// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DegreeVerification {

    struct Student {
        uint id;
        string name;
        string email;
        bool exists;
    }

    struct Certificate {
        uint studentId;
        string hash;
    }

    mapping(uint => Student) public students;
    mapping(uint => Certificate) public certificates;

    uint public studentCount = 0;

    // Register student
    function registerStudent(string memory name, string memory email) public returns (uint) {
        studentCount++;
        students[studentCount] = Student(studentCount, name, email, true);
        return studentCount;
    }

    // Issue certificate
    function issueCertificate(uint studentId, string memory certHash) public {
        require(students[studentId].exists, "Student does not exist");
        certificates[studentId] = Certificate(studentId, certHash);
    }

    // Verify certificate
    function getCertificate(uint studentId) public view returns (string memory) {
        require(students[studentId].exists, "Student does not exist");
        return certificates[studentId].hash;
    }
}
