@echo off
echo ====================================
echo   DEPLOIEMENT VERCEL SIMPLE
echo ====================================
echo.
echo Ce script deploie les fichiers statiques
echo sans installation ni build Angular
echo.

echo ETAPE 1: Preparation des fichiers...
echo.
echo 'no install'
echo 'no build'

echo.
echo ETAPE 2: Verification du dossier docs...
if not exist "docs" (
    echo ERREUR: Le dossier docs n'existe pas!
    pause
    exit /b 1
)

echo Dossier docs trouve!
echo.

echo ETAPE 3: Fichiers a deployer...
echo   - index.html (Page d'accueil)
echo   - jeux.html (Page des jeux)
echo   - styles-5INURTSO.css (Styles)
echo   - logo-icon.svg (Logo)
echo.

echo ETAPE 4: Instructions de deploiement...
echo.
echo METHODE 1 - Drag & Drop (Recommandee):
echo   1. Allez sur https://vercel.com
echo   2. Connectez-vous avec GitHub
echo   3. Cliquez sur "Add New" > "Upload"
echo   4. Glissez le dossier 'docs' dans la zone
echo   5. Attendez 30 secondes
echo   6. Votre site sera sur: https://magasin-jeux.vercel.app
echo.

echo METHODE 2 - Vercel CLI:
echo   1. npm i -g vercel
echo   2. vercel login
echo   3. cd docs
echo   4. vercel --prod
echo.

echo ====================================
echo   SITE PRET POUR DEPLOIEMENT!
echo ====================================
echo.
echo Votre site fonctionne deja sur:
echo https://hassen100.github.io/SEO-IA/
echo.
echo Et sera disponible sur Vercel:
echo https://magasin-jeux.vercel.app
echo.
pause
