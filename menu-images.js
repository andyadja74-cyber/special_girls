const fs = require("fs");
const path = require("path");

// Images du menu : placez les fichiers dans le dossier ./menu-images/
const MENU_IMAGES = [
  {
    file: "image1.jpg",
    caption: "🖼️ Image 1",
  },
  {
    file: "image2.jpg",
    caption: "🖼️ Image 2",
  },
  {
    file: "image3.jpg",
    caption: "🖼️ Image 3",
  },
];

/**
 * Envoie les trois images dans la conversation.
 * Compatible avec un socket Baileys : sendMenuImages(sock, jid).
 */
async function sendMenuImages(sock, jid) {
  for (const item of MENU_IMAGES) {
    const imagePath = path.join(__dirname, "menu-images", item.file);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image introuvable : ${imagePath}`);
    }

    await sock.sendMessage(jid, {
      image: fs.readFileSync(imagePath),
      caption: item.caption,
    });
  }
}

module.exports = {
  MENU_IMAGES,
  sendMenuImages,
};
