const mongoose = require('mongoose');

// Database connection
const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.gjgbrwz.mongodb.net/Week8';
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

// Connection event handlers
db.on('error', function(err) {
    console.log("Error occurred during connection: " + err);
});

db.once('connected', async function() {
    console.log(`Connected to ${MONGO_URI}`);
    
    try {
        // Creating the schema
        const PersonSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            age: Number,
            Gender: String,
            Salary: Number
        });

        // Creating model
        const Person = mongoose.model('Person', PersonSchema, 'personCollection');

        // ==========================================
        // TASK 1: Add a single document
        // ==========================================
        console.log("\n=== TASK 1: Adding Single Document ===");
        const doc1 = new Person({
            name: 'Irfan',
            age: 21,
            Gender: "Male",
            Salary: 3456
        });

        await doc1.save();
        console.log("New person has been added to your database:", doc1.name);

        // ==========================================
        // TASK 2: Adding multiple documents
        // ==========================================
        console.log("\n=== TASK 2: Adding Multiple Documents ===");
        const manypersons = [
            { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
            { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
            { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
            { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
        ];

        const insertResult = await Person.insertMany(manypersons);
        console.log(`Data inserted: ${insertResult.length} documents added`);

        // ==========================================
        // TASK 3: Fetch all documents (with limit 5)
        // ==========================================
        console.log("\n=== TASK 3: Fetching All Documents (Limited to 5) ===");
        const allDocs = await Person.find()
            .sort({ Salary: 1 })        // sort ascending by salary
            .select('name Salary age')  // name, salary, and age only
            .limit(5)                   // limit to 5 items
            .exec();

        console.log("Showing first 5 documents:");
        allDocs.forEach(function(doc) {
            console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
        });

        // ==========================================
        // TASK 4: Find with filtering criteria
        // ==========================================
        console.log("\n=== TASK 4: Finding Females Age > 25 ===");
        const givenage = 25;
        const filteredDocs = await Person.find({ 
            Gender: "Female", 
            age: { $gte: givenage } 
        })
        .sort({ Salary: 1 })        // sort ascending by salary
        .select('name Salary age')  // name, salary, and age only
        .limit(10)                  // limit to 10 items
        .exec();

        console.log(`Showing females with age greater than ${givenage}:`);
        filteredDocs.forEach(function(doc) {
            console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
        });


        // ==========================================
        // TASK 5: Count total documents
        // ==========================================
        console.log("\n=== TASK 5: Counting Total Documents ===");
        const totalCount = await Person.countDocuments().exec();
        console.log("Total documents Count:", totalCount);


        // ==========================================
        // TASK 6: Delete documents (age >= 25)
        // ==========================================
        console.log("\n=== TASK 6: Deleting Documents (Age >= 25) ===");
        const deleteResult = await Person.deleteMany({ 
            age: { $gte: 25 } 
        }).exec();
        
        console.log("Deleted documents count:", deleteResult.deletedCount);


        // ==========================================
        // TASK 7: Update documents (set salary for females)
        // ==========================================
        console.log("\n=== TASK 7: Updating Female Salaries to 5555 ===");
        
        // First add some female records back for demonstration
        await Person.insertMany([
            { name: 'Sarah', age: 28, Gender: "Female", Salary: 3000 },
            { name: 'Lisa', age: 32, Gender: "Female", Salary: 4000 }
        ]);

        const updateResult = await Person.updateMany(
            { Gender: "Female" },
            { Salary: 5555 }
        ).exec();
        
        console.log("Updated documents count:", updateResult.modifiedCount);

        // Display updated female records
        const updatedFemales = await Person.find({ Gender: "Female" })
            .select('name Salary age')
            .exec();
            
        console.log("Updated female records:");
        updatedFemales.forEach(function(doc) {
            console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
        });


    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        // Close the connection
        mongoose.connection.close();
        console.log("\nDatabase connection closed");
    }
});