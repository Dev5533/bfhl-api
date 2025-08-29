const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// User details (replace with your info)
const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


// Function to create alternating caps string
function alternatingCaps(str) {
    let result = "";
    let upper = true;
    for (let char of str) {
        result += upper ? char.toUpperCase() : char.toLowerCase();
        upper = !upper;
    }
    return result;
}




app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data || [];

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum_numbers = 0;
        let letters_for_concat = "";

        data.forEach(item => {
            const strItem = String(item);
            if (/^\d+$/.test(strItem)) {
                const num = parseInt(strItem);
                sum_numbers += num;
                if (num % 2 === 0) even_numbers.push(strItem);
                else odd_numbers.push(strItem);
            } else if (/^[a-zA-Z]+$/.test(strItem)) {
                alphabets.push(strItem.toUpperCase());
                letters_for_concat += strItem;
            } else {
                special_characters.push(strItem);
            }
        });

        const concat_string = alternatingCaps(letters_for_concat.split("").reverse().join(""));

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum_numbers),
            concat_string: concat_string
        });

    } catch (err) {
        res.status(400).json({
            is_success: false,
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
