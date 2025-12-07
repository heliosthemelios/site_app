<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Challenge OSINT – L’Horloger Fantôme</title>
    <style>
        body { font-family: Arial; background:#1b1b1b; color:#e6e6e6; padding:40px; line-height:1.6; }
        .container { max-width:800px; margin:auto; background:#2a2a2a; padding:30px; border-radius:10px; box-shadow:0 0 15px rgba(255,255,255,0.05);}
        h1 { color:#ffcc00; text-align:center; }
        a.start-btn { display:block; width:fit-content; margin:30px auto; padding:12px 25px; background:#ffcc00; color:#000; text-decoration:none; font-weight:bold; border-radius:5px; transition:0.2s; }
        a.start-btn:hover { background:#ffdd33; }
        .note { font-size:14px; color:#aaaaaa; text-align:center; margin-top:20px; }
        form { margin-top:30px; display:flex; flex-direction:column; gap:15px; }
        input { padding:10px; border-radius:5px; border:none; width:100%; }
        button { padding:12px; border:none; border-radius:5px; background:#ffcc00; color:#000; font-weight:bold; cursor:pointer; transition:0.2s; }
        button:hover { background:#ffdd33; }
        .result { margin-top:20px; font-weight:bold; }
    </style>
</head>
<body>

<div class="container">
    <h1>L’Horloger Fantôme</h1>

    <p>
        Un créateur de montres artisanales connu sous le nom de 
        <b>“L’Horloger Fantôme”</b> a disparu du jour au lendemain...
    </p>

    <h2>🎯 Objectifs de la mission</h2>
    <ul>
        <li>Retrouver le <b>vrai nom</b></li>
        <li>Identifier son <b>adresse email</b></li>
        <li>Trouver sa <b>dernière position connue</b></li>
    </ul>

    <a class="start-btn" href="defiosint/index.html">Commencer l’enquête</a>

    <?php
        $resultMessage = '';
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Remplace ces valeurs par les vraies réponses
            $correctName = "Marc Deligne";
            $correctEmail = "deligne@protonmail.com";
            $correctLocation = "Lyon";

            $name = trim($_POST['realName']);
            $email = trim($_POST['email']);
            $location = trim($_POST['lastLocation']);

            if ($name === $correctName && $email === $correctEmail && $location === $correctLocation) {
                $resultMessage = '<span style="color:#00ff00;">✅ Toutes les réponses sont correctes !</span>';
            } else {
                $resultMessage = '<span style="color:#ff3333;">❌ Certaines réponses sont incorrectes. Essayez encore.</span>';
            }
        }
    ?>

    <form method="post">
        <input type="text" name="realName" placeholder="Vrai nom: **** *******" required>
        <input type="email" name="email" placeholder="Adresse email: *******@**********.***" required>
        <input type="text" name="lastLocation" placeholder="Dernière position connue: ****" required>
        <button type="submit">Valider</button>
    </form>

    <?php if ($resultMessage !== '') echo '<div class="result">'.$resultMessage.'</div>'; ?>

    <p class="note">
        (Conseil : l’inspecteur qui sommeille en vous devra parfois regarder plus loin que ce qui est visible.)
    </p>
</div>

</body>
</html>
