import { FormInst, FormItemRule } from "naive-ui";
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
                            "This is a past event, but you are still welcome to contribute"
                        );
                    }
                    return true;
                },
            },
        ],
    };

    export const verifySubmission = async (
        form: FormInst,
        message: any
    ): Promise<boolean> => {
        let valid = false;
        await form.validate().then((errors) => {
            valid = !!errors;
            if (errors) {
                console.log("Errors in form submission:", errors);
            }
        });

        return valid;
    };

    // This opens a POST request to the API
    export const submitEvent = async (
        form: FormInst,
        formValue: IEventSubmission,
        message: any
    ) => {
        const isValid = await verifySubmission(form, message);
        if (!isValid) {
            message.error("Errors in form submission");
        } else {
            message.info("Submitting form...");
            console.log("Submitting following:", JSON.stringify(formValue));
            axios
                .post(`${apiUrl}/api/event/add`, formValue)
                .then((res) => {
                    message.success("Submission successful!");
                    console.log("Submission successful: ", JSON.stringify(res));
                })
                .catch((err) => {
                    message.error("Submission failed!");
                    console.error(`Failed to submit event: ${err}`);
                });
        }
    };
}
