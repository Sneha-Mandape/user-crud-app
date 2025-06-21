<?php
class User {
    private $conn;
    private $table = "users";

    public $id;
    public $name;
    public $email;
    public $password;
    public $dob;

    public function __construct($db) {
        $this->conn = $db;
    }

    //Create User 
    public function create(){
        $query = "INSERT INTO " . $this->table . " SET name=:name, email=:email, password=:password, dob=:dob";

        $stmt = $this->conn->prepare($query);
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
        
        $stmt->bindParam(":name", $this->name);      // ✅ Use $stmt here
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":dob", $this->dob);

        return $stmt->execute();
    }

    //Read All Users
    public function read() {
       $query = "SELECT id, name, email, dob FROM " . $this->table;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    //Update USer
    public function update() {
        $query = "UPDATE " . $this->table . " 
                SET name = :name, email = :email, dob = :dob 
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":dob", $this->dob);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }


    // Delete User
    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }
}