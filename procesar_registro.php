<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function responder(string $status, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode(
        ['status' => $status, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder('error', 'Método no permitido.', 405);
}

$idioma = isset($_POST['idioma']) && $_POST['idioma'] === 'en' ? 'en' : 'es';
$mensajes = [
    'es' => [
        'invalid' => 'Completa todos los campos con datos válidos.',
        'success' => '¡Inscripción guardada correctamente!',
        'error' => 'No se pudo guardar la inscripción. Inténtalo de nuevo más tarde.',
    ],
    'en' => [
        'invalid' => 'Please complete all fields with valid information.',
        'success' => 'Registration saved successfully!',
        'error' => 'Registration could not be saved. Please try again later.',
    ],
];

$nombre = isset($_POST['nombre']) && is_string($_POST['nombre']) ? trim($_POST['nombre']) : '';
$email = isset($_POST['email']) && is_string($_POST['email']) ? trim($_POST['email']) : '';
$telefono = isset($_POST['telefono']) && is_string($_POST['telefono']) ? trim($_POST['telefono']) : '';
$plan = isset($_POST['plan']) && is_string($_POST['plan']) ? trim($_POST['plan']) : '';
$planesPermitidos = ['basic', 'pro', 'vip', 'duo'];

if (
    $nombre === '' ||
    filter_var($email, FILTER_VALIDATE_EMAIL) === false ||
    $telefono === '' ||
    !in_array($plan, $planesPermitidos, true)
) {
    responder('error', $mensajes[$idioma]['invalid'], 400);
}

try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conexion = new mysqli('localhost', 'root', '', 'titan_fitness');
    $conexion->set_charset('utf8mb4');

    $consulta = $conexion->prepare(
        'INSERT INTO registros (nombre, email, telefono, plan) VALUES (?, ?, ?, ?)'
    );
    $consulta->bind_param('ssss', $nombre, $email, $telefono, $plan);
    $consulta->execute();
    $consulta->close();
    $conexion->close();

    responder('success', $mensajes[$idioma]['success']);
} catch (mysqli_sql_exception $exception) {
    error_log('Error al guardar registro Titan Fitness: ' . $exception->getMessage());
    responder('error', $mensajes[$idioma]['error'], 500);
}