<?php
// Configuration base de données
$host = "localhost";
$dbname = "site_app";
$user = "root"; // à adapter
$password = "Je vais a la peche1."; // à adapter

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["email"])) {
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

        // Préparation et insertion
        $stmt = $pdo->prepare("INSERT INTO abonnements (email) VALUES (:email)");
        $stmt->execute(['email' => $email]);

        // Redirection
        header("Location: merci.html");
        exit();
    } else {
        echo "Email invalide.";
    }
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
