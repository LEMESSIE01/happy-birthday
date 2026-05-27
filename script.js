// --- 1. OUVERTURE DU SITE + FORCE LE CHARGEMENT AUDIO ---
function ouvrirCadeau() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const musicIntro = document.getElementById('music-intro');

    if (welcomeScreen && mainContent) {
        if (musicIntro) {
            musicIntro.volume = 0.4;
            musicIntro.load(); // Réveille le composant audio
            musicIntro.play().catch(e => console.log("Lancement audio bloqué ou fichier manquant :", e));
        }

        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
            setInterval(creerCoeur, 300); 
        }, 500);
    }
}

// --- 2. TRANSITION DEUXIÈME MUSIQUE (SOUVENIRS 13 À 20) ---
function lancerMusiqueLettre() {
    const musicIntro = document.getElementById('music-intro');
    const musicLettre = document.getElementById('music-lettre');
    const btnTransition = document.getElementById('next-phase-btn');

    if (musicIntro) musicIntro.pause();
    
    if (musicLettre) {
        musicLettre.volume = 0.4;
        musicLettre.load(); 
        musicLettre.play().catch(e => console.log("Erreur de lecture musique lettre :", e));
    }

    if (btnTransition) {
        btnTransition.innerText = "Ambiance mise à jour ! ✨";
        btnTransition.disabled = true;
    }
}

// --- 3. ANIMATION PLUIE DE CŒURS ---
function creerCoeur() {
    const coeur = document.createElement('div');
    coeur.innerHTML = '❤️';
    coeur.style.position = 'fixed';
    coeur.style.top = '-20px';
    coeur.style.left = Math.random() * 100 + 'vw'; 
    coeur.style.fontSize = Math.random() * 20 + 12 + 'px';
    
    const duree = Math.random() * 3 + 3;
    coeur.style.animation = `tomber ${duree}s linear forwards`;
    coeur.style.zIndex = '999';
    coeur.style.pointerEvents = 'none';
    coeur.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(coeur);
    setTimeout(() => { coeur.remove(); }, duree * 1000);
}

// --- 4. TEXTE DE LA LETTRE ET EFFET MACHINE À ÉCRIRE ---
const messageDAmour = " Ma chère  MINIMOYSE,\n\n Bon voilà t'as maintenant 18 ans ! Tu es majeur comme tu le voulais aussi et trés franchement je suis tout aussi heureux pour toi je ne te connais pas depuis super longtemps mais je ne regrette pas du tout et rien aussi tu es ma plus belle rencontre celle qui me rappel maman .\n\n Et Je me demande si les gens comme toi existe vraiment parce que le coeur ,l'empathie, la sagesse , le peu de maturité ,la joie de vivre que tu as  fais de toi la personne incroyable et spécial que tu es et qui rend toutes les personne autours de toi aussi heureuse.  Sans compter aussi les fois où tu n'est pas trop juste un peu folle , des fois tristres , et malgrés ça tu trouve toujpur la force de te levé et d'aller de l'avant  \n\nJe te souhaite le plus merveilleux des anniversaires. Que cette nouvelle année t'apporte de la joie, de la réussite dans tes projets,liberté financiere et toutes les joie que le monde peu offrir à la plus belle personne au monde à mes yeux . Que le grand DIEU te garde et veille toujour sur toi qu'il te protège aussi peu importe où tu mettra les pieds!\n\n Et clairement j'espere que ce petit site t'ai plu parce je l'ai fais avec beaucoup d'attention c'est le genre de truc que tu apprecirais mais je me suis dis que ça serais assez original  malgrés le faite que je n'ai pu faire que la premiere partie mais t'inquiete pas  la seconde est en route  du coup c'est sur ces mots que je vais m'arreter là.\n\n  Bon bah voilà  MATOKO BAMANA Jimelda Pauliana Grace alias la fille de Monsieur MATOKO  je te souhaite encore un trés bon anniversaire et Je t'aime ❤️";
let indexTexte = 0;
let ecritureLancee = false;

// --- 5. LECTURE FINALE ET AFFICHAGE ENVELOPPE ---
function ouvrirLettreMagique() {
    const letterContainer = document.getElementById('letter-container');
    const mailbox = document.getElementById('mailbox');
    const musicLettre = document.getElementById('music-lettre');
    const musicIntro = document.getElementById('music-intro'); 
    const musicFinal = document.getElementById('music-final');
    
    if (letterContainer && letterContainer.classList.contains('hidden')) {
        if (musicLettre) musicLettre.pause();
        if (musicIntro) musicIntro.pause();
        
        if (musicFinal) {
            musicFinal.volume = 0.4;
            musicFinal.load(); 
            musicFinal.play().catch(e => console.log("Erreur lecture finale :", e));
        }

        letterContainer.classList.remove('hidden');
        if (mailbox) mailbox.innerHTML = '<span style="font-size: 4rem;">📭</span>'; 
        
        demarrerMachineAEcrire();
        setTimeout(() => { letterContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
    }
}

function demarrerMachineAEcrire() {
    if (ecritureLancee) return; 
    ecritureLancee = true;
    const zoneTexte = document.getElementById('love-text');
    if (zoneTexte) {
        zoneTexte.innerHTML = "";
        ecrireLettre();
    }
}

function ecrireLettre() {
    const zoneTexte = document.getElementById('love-text');
    if (indexTexte < messageDAmour.length) {
        zoneTexte.innerHTML += messageDAmour.charAt(indexTexte);
        indexTexte++;
        setTimeout(ecrireLettre, 35); 
    }
}

// --- 6. GESTION DES VIDEOS AU SURVOL / CLIC ---
window.onload = function() {
    const toutesLesVideos = document.querySelectorAll('.hover-video');
    toutesLesVideos.forEach(video => {
        const videoContainer = video.parentElement;
        videoContainer.addEventListener('mouseenter', () => { video.play().catch(e => {}); });
        videoContainer.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
        videoContainer.addEventListener('click', (e) => {
            if (video.paused) {
                toutesLesVideos.forEach(v => { if(v !== video) v.pause(); });
                video.play().catch(e => {});
            } else { video.pause(); }
        });
    });
};