const ContactModel = require('../Models/ContactModel');

exports.CreateContact = async (request, response) => {
    const { fullname, email, contact_num, gender } = request.body;

    let errorMessage = "";
    if (!fullname && !email && !contact_num && !gender){
        errorMessage = 'Please fill in all required fields';
    } else if (!fullname) {
        errorMessage = "Full name is required.";
    } else if (!email) {
        errorMessage = "Email is required.";
    } else if (!contact_num) {
        errorMessage = "Contact number is required.";
    } else if (!gender) {
        errorMessage = "Gender is required.";
    }

    if (errorMessage) {
        return response.status(400).json({ message: errorMessage });
    }

    try{
        const existingContact = await ContactModel.findOne({ email });
        if (existingContact) {
            return response.status(400).json({ message: "Email is already in use." });
        }
        
        const contactInfo = await ContactModel.create({
            full_name: fullname,
            email: email,
            contact_num: contact_num,
            gender: gender
        });
        return response.status(201).json({ message: "Contact information has been recorded successfully", contactInfo });

    } catch (error) {
        return response.status(500).json({error})
    }
}

exports.GetAllContacts = async (request, response) => {
    try{
        const contact = await ContactModel.find()
        if (!contact){
            return response.status(404).json({message: "Contacts Not Found"})
        }
        return response.status(200).json({contact})
    } catch(error){
        return response.status(500).json({Error: error})
    }
}

exports.UpdateContact = async  (request, response) => {
    const id = request.params.id
    const {full_name, email, contact_num, gender} = request.body;

    try{
        let contact = await ContactModel.findByIdAndUpdate(id, {
            full_name: full_name, 
            email: email, 
            contact_num: contact_num, 
            gender: gender
        }, { new: true })

        if (!contact) {
            return response.status(404).json({ message: "Contact not found" });
        }
        return response.status(200).json({message: "Contact Information has been updated successfully", contact})

    }catch(error){
        return response.status(500).json({message: "Error occurred in UpdateContact controller", error})
    }
}

exports.DeleteContact = async (request, response) => {
    const id = request.params.id
    try{
        let contact = await ContactModel.findByIdAndDelete(id)
        if (!contact) {
            return response.status(404).json({ message: "Contact not found" });
        }
        return response.status(204).json({ message: "Contact Information has been deleted successfully" });

    }catch(error){
        return response.status(500).json({message: "Error occurred in DeleteContact controller", error})

    }
}

exports.GetContactDetails = async (request, response) => {
    const id = request.params.id
    try{
        let contact = await ContactModel.findById(id)
        if (!contact){
            return response.status(404).json({ message: "Contact not found" });
        } 
        return response.status(200).json({contact})

    }catch(error){
        return response.status(500).json({message: "Error occurred in GetContactDetails controller", error})
    }
}