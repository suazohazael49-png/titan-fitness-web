<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');

$servername = "mysql-2644faa1-suazohazael49-6fc8.l.aivencloud.com";
$username   = "avnadmin";
$password   = "AVNS_IWgaUXeKTGXNbv04Eb4";
$dbname     = "defaultdb";
$port       = 24366;

try {
    $dsn = "mysql:host=$servername;port=$port;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::MYSQL_ATTR_SSL_CA => true,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    $pdo = new PDO($dsn, $username, $password, $options);

    $tablaSQL = "CREATE TABLE IF NOT EXISTS registros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        plan VARCHAR(50) NOT NULL,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($tablaSQL);

    $nombre   = $_POST['nombre'] ?? '';
    $email    = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $plan     = $_POST['plan'] ?? '';

    if (!empty($nombre) && !empty($email)) {
        $stmt = $pdo->prepare("INSERT INTO registros (nombre, email, telefono, plan) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$nombre, $email, $telefono, $plan])) {
            echo json_encode(["status" => "success", "message" => "¡Registro completado con éxito!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al guardar en la base de datos"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Por favor llena los campos requeridos"]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error BD: " . $e->getMessage()]);
}
?>
