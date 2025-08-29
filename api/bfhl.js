export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST requests allowed" });
    }

    try {
        const { data } = req.body || [];

        const FULL_NAME = "john_doe";
        const DOB = "17091999";
        const EMAIL = "john@xyz.com";
        const ROLL_NUMBER = "ABCD123";

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum_numbers = 0;
        let letters_for_concat = "";

        // Helper function for alternating caps
        function alternatingCaps(str) {
            let result = "";
            let upper = true;
            for (let char of str) {
                result += upper ? char.toUpperCase() : char.toLowerCase();
                upper = !upper;
            }
            return result;
        }

        data.forEach(item => {
            const strItem = String(item); // Always convert to string
            if (/^\d+$/.test(strItem)) {
                const num = parseInt(strItem);
                sum_numbers += num;
                if (num % 2 === 0) even_numbers.push(strItem); // Push as string
                else odd_numbers.push(strItem);                // Push as string
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
            sum: String(sum_numbers),      // Return sum as string
            concat_string: concat_string
        });

    } catch (err) {
        res.status(400).json({ is_success: false, error: err.message });
    }
}
