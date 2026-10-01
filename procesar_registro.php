<?php
header('Content-Type: application/json');

$servername = "mysql-2644faa1-suazohazael49-6fc8.l.aivencloud.com";
$username   = "avnadmin";
$password   = "AVNS_TWgaUXeKTGXNbV04Eb4";
$dbname     = "defaultdb";
$port       = 24366;

// Conexión a la base de datos MySQL en Aiven
$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Crear la tabla 'registros' automáticamente si no existe aún
$tablaSQL = "CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($tablaSQL);

// Obtener los datos enviados desde el formulario
$nombre   = $_POST['nombre'] ?? '';
$email    = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$plan     = $_POST['plan'] ?? '';

if (!empty($nombre) && !empty($email)) {
    $stmt = $conn->prepare("INSERT INTO registros (nombre, email, telefono, plan) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $email, $telefono, $plan);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "¡Registro completado con éxito!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al guardar los datos"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Por favor llena todos los campos requeridos"]);
}

$conn->close();
?>
