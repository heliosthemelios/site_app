<?php
// --- Configuration ---
$bonne_reponse = "centaurus a"; // La galaxie d'Hectorliz

$message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reponse = strtolower(trim($_POST['galaxie']));

    if ($reponse === strtolower($bonne_reponse)) {
        // Si tu veux aller vers la suite du challenge :
        $message = "Bravo ! Vous avez trouvé la galaxie d'Hectorliz.";
        exit;
    } else {
        $message = "<p class='error'>❌ Ce n'est pas le nom de la galaxie d'Hectorliz...</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>L’Horloger Fantôme – Introduction</title>
    <style>
        body {
            background: #0f0f0f;
            color: #e5e5e5;
            font-family: Arial, sans-serif;
            padding: 40px;
        }
        .container {
            max-width: 700px;
            margin: auto;
            background: #1b1b1b;
            padding: 30px;
            border-radius: 6px;
            border: 1px solid #333;
        }
        h1 { text-align: center; }
        p { line-height: 1.6; }
        input[type="text"] {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border-radius: 4px;
            border: none;
            background: #262626;
            color: #eee;
        }
        input[type="submit"] {
            margin-top: 15px;
            padding: 12px 20px;
            background: #4a78ff;
            color: white;
            border: none;
            border-radius: 4px;
            width: 100%;
            cursor: pointer;
            font-size: 16px;
        }
        input[type="submit"]:hover {
            background: #6a90ff;
        }
        .error {
            background: #a01616;
            padding: 12px;
            border-radius: 4px;
            color: #fff;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Le Journal d’Hectorliz</h1>

    <p>
        Après des semaines de silence, Hectorliz a finalement posté un étrange message sur le forum.
        Personne ne comprend vraiment sa langue, mais les fragments décodés parlent d’une “lueur venue
        d’un autre monde”, et d’un “cœur cosmique où débute la fracture”.
    </p>

    <p>
        Le seul indice clair : <strong>il faut retrouver le nom de la galaxie qu’il observait</strong>.
        Tout le reste du scénario ne s’ouvrira qu’à ceux qui découvriront ce nom.
    </p>
    <a href="../jeu/index.html">Par ici le jeu</a>

    <form method="POST">
        <label for="galaxie">Nom de la galaxie d’Hectorliz :</label>
        <input type="text" name="galaxie" id="galaxie" placeholder="Entrez le nom..." required>
        <input type="submit" value="Valider">
    </form>

    <?= $message ?>
</div>

</body>
</html>
