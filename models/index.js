/* Dans ce fichier,
1. l'initialisation de mon sequelize
2. L'import des modèles
3. Les associations
*/

// Récupérer la librairie de Sequelize
const {Sequelize} = require('sequelize');

// SI cette propriété (générée automatiquement par Heroku)
// n'existe pas, c'est que je suis en local
// Et donc que j'aurai besoin d'importer et configurer dotenv
if(!process.env.NODE_ENV) {
    const dotenv = require('dotenv');

    // Transformer chaque variable dans .env en process.env.qqchose
    dotenv.config();    
}

const sequelize = new Sequelize(
    // Dans le cas de mariadb
    // 'mariadb://notes_user:1poney2poneys3poneys@localhost/notes'
   // Dans le cas de mysql
   process.env.DATABASE_URL
)

// Un modèle, c'est un objet JS qui est en lien avec une table de BDD
const Category = require('./Category')(sequelize);
const Message = require('./Message')(sequelize);

// L'objectif, ça va être de récupérer une fonction de définition de modèle
// Appel d'une fonction qui va se lancer avec en paramètre sequelize
const Emoji = require('./Emoji')(sequelize);


// One To Many | Many To One
// Une catégorie peut être associé à plusieurs messages
Category.hasMany(Message);
// Un message peut être lié à une seule catégorie
Message.belongsTo(Category);


// Un message peut avoir plusieurs émojis
Message.belongsToMany(Emoji, {through: "message_emoji"})
// Un émoji peut être dans plusieurs messages
Emoji.belongsToMany(Message, {through: "message_emoji"})

// La version Node.JS de "export sequelize"
module.exports = sequelize;