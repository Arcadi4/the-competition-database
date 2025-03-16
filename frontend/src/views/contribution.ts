import type { FormInst, FormItemRule } from "naive-ui";
import { message } from "../../message";
import axios from "axios";
import { apiUrl } from "@/main";
import { IEventSubmission } from "@/types";

export module contribution {
    export const formRules = {
        title: [
            {
                required: true,
                message: "A title is required",
                trigger: ["input", "blur"],
            },
        ],
        briefDescription: [
            {
                required: true,
                message: "A summary is required",
                trigger: ["input", "blur"],
            },
        ],
        longDescription: [
            {
                required: true,
                message: "A description is required",
                trigger: ["input", "blur"],
            },
            {
                trigger: ["blur"],
                level: "warning",
                validator: (_rule: FormItemRule, value: string) => {
                    if (value.length < 100) {
                        return new Error(
                            "Consider a more detailed description"
                        );
                    }
                    return true;
                },
            },
        ],
        tags: [],
        timestamp: [
            {
                trigger: ["input", "blur"],
                level: "warning",
                validator: (_rule: FormItemRule, value: number) => {
                    if (value < Date.now().valueOf() - 86400000) {
                        return new Error(
                            "This is an past event, but you are still welcome to contribute"
                        );
                    }
                    return true;
                },
            },
        ],
    };

    export const verifySubmission = async (
        form: FormInst
    ): Promise<boolean> => {
        let valid = false;
        await form.validate().then((errors) => {
            valid = !!errors;
            if (errors) {
                console.error(JSON.stringify(errors));
            }
        });
        return valid;
    };

    // This opens a POST request to the API
    export const submitEvent = async (
        form: FormInst,
        formValue: IEventSubmission
    ) => {
        const errors = verifySubmission(form);
        if (errors != null) {
            message.error("Errors in form submission");
        } else {
            // Submit the form
            message.info("Submitting form...");
            console.log("Submitting following:", JSON.stringify(formValue));
            axios
                .post(`${apiUrl}/api/event/add`, formValue)
                .catch((err) => {
                    message.error("Submission failed!");
                    message.error(err);
                    console.error(`Failed to submit event: ${err}`);
                })
                .then((res) => {
                    message.success("Submission successful!");
                    console.log("Submission successful: ", JSON.stringify(res));
                });
        }
    };
}
