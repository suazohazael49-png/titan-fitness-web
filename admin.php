<?php
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
    $stmt = $pdo->query("SELECT * FROM registros ORDER BY fecha_registro DESC");
    $registros = $stmt->fetchAll();
} catch (PDOException $e) {
    die("Error al conectar: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Titan Fitness</title>
    <style>
        body { font-family: Arial, sans-serif; background: #121212; color: #fff; padding: 20px; }
        h1 { color: #ff3b3f; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #1e1e1e; }
        th, td { padding: 12px; border: 1px solid #333; text-align: left; }
        th { background: #252525; color: #ff3b3f; }
        tr:nth-child(even) { background: #181818; }
    </style>
</head>
<body>
    <h1>Lista de Inscriptos - Titan Fitness</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Plan</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($registros as $row): ?>
            <tr>
                <td><?= htmlspecialchars($row['id']) ?></td>
                <td><?= htmlspecialchars($row['nombre']) ?></td>
                <td><?= htmlspecialchars($row['email']) ?></td>
                <td><?= htmlspecialchars($row['telefono']) ?></td>
                <td><?= htmlspecialchars($row['plan']) ?></td>
                <td><?= htmlspecialchars($row['fecha_registro']) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
