# Création d’une RESTful API pour une pizzeria : Step 3 – Structuration du code

## How to ? Structurer le code
- On souhaite pouvoir facilement remplacer la couche d’accès aux données (accès à un fichier .json actuellement) sans changer
  - La (re)présentation des ressources
  - Le router / controller
- Comme on a peu de contraintes pour la structure de la partie "logique" (ou business), on va donc créer un "Fat Model". En résumé, les RESTful APIs que l'on développera seront structurées de cette façon :
- Un router / controller s'occupant de l'aspect présentation des ressources (en fonction des requêtes)
- Un "Fat Model" qui s'occupera de la partie "logique" et de la partie "données" (ou aussi nommé "services").
- Création du modèle `/model/pizzas.js` fournissant les opérations `getAll`, `getOne`, `addOne`, `deleteOne`, `updateOne` et gérant la persistance des données au sein du fichier `/data/pizzas.json`
- Création d'un module `/utils/json.js` pour fournir les services associés à l'accès aux données JSON.





