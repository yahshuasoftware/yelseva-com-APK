import axios from "axios";
import SummaryApi from "../apiIntegration"

export const SignIn = async (email, password, district, state) => {
    try {
        console.log("Sending data:", { email, password, district, state });

        const response = await axios({
            url: SummaryApi.signIn.url,
            method: SummaryApi.signIn.method,
            data: { email, password, district, state },
        });

        console.log("Login response:", response.data);

        return response.data;
    } catch (error) {
+        console.error("Error occurred during login:", error);

        if (error.response) {
            console.error("Error response:", error.response);
            throw error.response.data;
        } else {
            console.error("No response from server, network issue?");
            throw "An error occurred during login";
        }
    }
}
