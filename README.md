# Save The Planet Multiplayer

Ein Zwei-Spieler-MakeCode-Arcade-Spiel: Beide Spieler verteidigen den Planeten gegen Smog, Schrott und gepanzerte Weltraumtrümmer. Die Steuerung bleibt bewusst schlicht, damit sich das Spiel wie vorher anfühlt, aber Grafik, Gegnerlogik, Effekte und Spieltempo sind überarbeitet.

## Spielen

Die veröffentlichte Version läuft über GitHub Pages:

[https://1234taschenlampe.github.io/save-the-planet-multiplayer/](https://1234taschenlampe.github.io/save-the-planet-multiplayer/)

## Steuerung

- Spieler 1 bewegt sich mit der Standard-Spieler-1-Steuerung.
- Spieler 1 schießt mit `A`.
- Spieler 2 bewegt sich mit der Standard-Spieler-2-Steuerung.
- Spieler 2 schießt mit `A`.

Es wurden keine neuen Pflicht-Tasten hinzugefügt und keine bestehenden Eingaben geändert.

## Was neu ist

- Detailliertere Eco-Sci-Fi-Grafik für Schiffe, Projektile, Gegner, Reparaturkerne und Planet.
- Wave-System mit steigender Schwierigkeit.
- Mehr Gegnertypen: Smog, Schrott und gepanzerter Schrott.
- Reparaturkerne füllen den Planetenschutz wieder auf.
- Kurze Unverwundbarkeit nach Treffern verhindert unfair schnellen Lebensverlust.
- Punkte werden dem Spieler zugeordnet, der das Ziel trifft.
- Aufgeräumtes TypeScript-Projekt: `main.ts` ist die gepflegte Hauptquelle.

## Projekt bearbeiten

Dieses Repository kann in MakeCode Arcade importiert werden:

1. [https://arcade.makecode.com/](https://arcade.makecode.com/) öffnen.
2. **Importieren** auswählen.
3. **Importiere URL** wählen.
4. `https://github.com/1234taschenlampe/save-the-planet-multiplayer` einfügen.

Das Projekt ist jetzt auf TypeScript-Bearbeitung ausgelegt. Alte Block- und Python-Zwischenstände wurden entfernt, damit keine veralteten Quellen im Repository liegen.

## Build

Mit installiertem MakeCode/PXT:

```sh
pxt build
pxt test
```

## Metadaten

- Ziel: MakeCode Arcade / PXT
- Gepflegte Quelle: `main.ts`
