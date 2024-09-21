import { error } from "console";
import * as jsonfile from "jsonfile";
import * as path from "path";
 // ruta de contacts.json
 const pathContacts = path.join(__dirname,"./contacts.json");
class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
 
  data: Contact[] = [];
  
  load() {
    // retorna la promesa de jsonfile.readFile() Para utilizar then() en la intancia de ContactsCollection()
    return jsonfile.readFile(pathContacts)
    .then((contact) => {
      // asigna el collection de contacts.json al data de la instancia actual
      this.data = contact;
    })

    .catch((err) => {
      console.log("Error al leer el archivo",err);
    });
    
   
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    return jsonfile.writeFile (pathContacts,this.data)
    .then(() => {
      console.log("Cambios guardados exitosamente");
    })

    .catch((err) => {
      console.log("error al guardar los cambios",err);
    });
    
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

