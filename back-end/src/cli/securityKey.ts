import fs from 'fs';
import forge from 'node-forge';
import path from "path"
const keysFolderPath = path.join(__dirname, "../keys")
const privateKeyFilename = 'private.key.pem';
const publicKeyFilename = 'public.key.pem';

const generateKeys = () => {
    // Create keys folder if it doesn't exist
    if (!fs.existsSync(keysFolderPath)) {
        fs.mkdirSync(keysFolderPath);
    }
    // Generate key pair
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    // Convert keys to PEM format
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    // Save private and public keys to files
    fs.writeFileSync(`${keysFolderPath}/${privateKeyFilename}`, privateKeyPem);
    fs.writeFileSync(`${keysFolderPath}/${publicKeyFilename}`, publicKeyPem);
};

generateKeys();
console.log('Keys generated and saved successfully.');
