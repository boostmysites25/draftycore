import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';

type FormData = {
    firstName: string;
    lastName: string;
    organisationName: string;
    email: string;
    contactNumber: string;
    services: string[];
    software: string[];
    requirements: string;
    file: FileList;
};

const defaultFormValues: Partial<FormData> = {
    firstName: "",
    lastName: "",
    organisationName: "",
    email: "",
    contactNumber: "",
    services: [],
    software: [],
    requirements: "",
};

const Contact = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { register, handleSubmit, trigger, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        mode: "all",
        defaultValues: {
            ...defaultFormValues,
            services: [],
            software: []
        }
    });

    // Watch values to update UI state
    const selectedServices = watch("services", []);
    const selectedSoftware = watch("software", []);

    const toggleSelection = (field: "services" | "software", value: string) => {
        const current = field === "services" ? selectedServices : selectedSoftware;
        // Ensure current is an array (it might be undefined initially)
        const currentArray = Array.isArray(current) ? current : [];

        let updated: string[];
        if (currentArray.includes(value)) {
            updated = currentArray.filter(item => item !== value);
        } else {
            updated = [...currentArray, value];
        }

        setValue(field, updated, { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const formData = new FormData();
            
            formData.append("to", "mpranavprem@gmail.com");
            formData.append("subject", "New Contact Form Submission - DraftyCore");
            formData.append("name", "DraftyCore Website");
            
            const body = `First Name : ${data.firstName} \n
Last Name : ${data.lastName} \n
Organisation Name : ${data.organisationName} \n
Email : ${data.email} \n
Contact Number : ${data.contactNumber} \n
Services : ${data.services.join(", ")} \n
Software : ${data.software.join(", ")} \n
Requirements : ${data.requirements} \n`;
            
            formData.append("body", body);

            if (data.file && data.file.length > 0) {
                formData.append("attachments", data.file[0]);
            }

            const response = await fetch("https://send-mail-redirect-boostmysites.vercel.app/send-email", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Registration Submitted Successfully!");
                reset({ ...defaultFormValues, file: undefined } as unknown as FormData);
                setStep(1);
                navigate("/thank-you");
            } else {
                toast.error("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    const nextStep = async () => {
        const isValid = await trigger([
            "firstName",
            "lastName",
            "organisationName",
            "email",
            "contactNumber"
        ]);
        if (isValid) setStep(2);
    };

    const prevStep = () => setStep(1);

    return (
        <div className="min-h-screen flex flex-col font-coolvetica bg-[#F5F5F0]">
            <div className="flex-1 flex justify-center items-center py-32 px-5">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg w-full max-w-3xl border border-black/5 relative overflow-hidden">

                    {/* Progress Indicator */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                        <div
                            className="h-full bg-brandorange transition-all duration-500 ease-out"
                            style={{ width: step === 1 ? '50%' : '100%' }}
                        />
                    </div>

                    <h2 className="font-maus text-4xl md:text-6xl uppercase mb-2 text-center text-secondary tracking-tight">
                        Contact Us
                    </h2>
                    <p className="text-center text-gray-500 font-sans mb-10 text-sm md:text-base">
                        Step {step} of 2: {step === 1 ? "Organization Details" : "Project Requirements"}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* STEP 1: Personal & Org Details */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in-up">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-secondary tracking-wide">First Name*</label>
                                        <input
                                            {...register("firstName", { required: "First name is required" })}
                                            placeholder="John"
                                            className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50"
                                        />
                                        {errors.firstName && <span className="text-red-500 text-xs font-sans mt-1">{errors.firstName.message}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-secondary tracking-wide">Last Name*</label>
                                        <input
                                            {...register("lastName", { required: "Last name is required" })}
                                            placeholder="Doe"
                                            className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50"
                                        />
                                        {errors.lastName && <span className="text-red-500 text-xs font-sans mt-1">{errors.lastName.message}</span>}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-secondary tracking-wide">Organisation Name*</label>
                                    <input
                                        {...register("organisationName", { required: "Organisation name is required" })}
                                        placeholder="Your Company Ltd."
                                        className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50"
                                    />
                                    {errors.organisationName && <span className="text-red-500 text-xs font-sans mt-1">{errors.organisationName.message}</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-secondary tracking-wide">Email Address*</label>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            placeholder="john@example.com"
                                            className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs font-sans mt-1">{errors.email.message}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-secondary tracking-wide">Contact Number*</label>
                                        <input
                                            {...register("contactNumber", {
                                                required: "Contact number is required",
                                                pattern: {
                                                    value: /^[0-9+\s-]{8,}$/,
                                                    message: "Invalid phone number"
                                                }
                                            })}
                                            placeholder="+1 234 567 890"
                                            className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50"
                                        />
                                        {errors.contactNumber && <span className="text-red-500 text-xs font-sans mt-1">{errors.contactNumber.message}</span>}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full bg-brandorange text-white font-bold uppercase py-4 rounded-md hover:bg-brandorange/90 transition-colors tracking-widest text-lg shadow-lg shadow-brandorange/20"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Technical Details */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in-up">
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-secondary tracking-wide">Select Services*</label>
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                                        {["Architecture", "Civil Engineering", "Shop Detailing", "Structure Engineering"].map((service) => (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => toggleSelection("services", service)}
                                                className={`p-4 rounded-md border text-left transition-all duration-200 font-sans text-sm md:text-base ${selectedServices?.includes(service)
                                                        ? "bg-brandorange text-white border-brandorange shadow-md shadow-brandorange/20"
                                                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-brandorange/50"
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input for validation */}
                                    <input
                                        type="hidden"
                                        {...register("services", { required: "Please select at least one service" })}
                                        value={selectedServices?.length ? "valid" : ""}
                                    />
                                    {errors.services && <span className="text-red-500 text-xs font-sans mt-1">{errors.services.message}</span>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-secondary tracking-wide">Software Required*</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {["ArchiCAD", "AutoCAD", "Revit", "Sketchup", "Tekla"].map((sw) => (
                                            <button
                                                key={sw}
                                                type="button"
                                                onClick={() => toggleSelection("software", sw)}
                                                className={`p-4 rounded-md border text-center transition-all duration-200 font-sans text-sm md:text-base ${selectedSoftware?.includes(sw)
                                                        ? "bg-brandorange text-white border-brandorange shadow-md shadow-brandorange/20"
                                                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-brandorange/50"
                                                    }`}
                                            >
                                                {sw}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input for validation */}
                                    <input
                                        type="hidden"
                                        {...register("software", { required: "Please select at least one software" })}
                                        value={selectedSoftware?.length ? "valid" : ""}
                                    />
                                    {errors.software && <span className="text-red-500 text-xs font-sans mt-1">{errors.software.message}</span>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-secondary tracking-wide">Additional Requirements</label>
                                    <textarea
                                        {...register("requirements")}
                                        placeholder="Any specific project details or questions..."
                                        className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange focus:ring-1 focus:ring-brandorange/20 transition-all bg-gray-50 min-h-[100px] resize-y"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-secondary tracking-wide">File Upload</label>
                                    <input
                                        type="file"
                                        {...register("file")}
                                        className="p-3 border border-gray-200 rounded-md font-sans focus:outline-none focus:border-brandorange transition-all bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandorange/10 file:text-brandorange hover:file:bg-brandorange/20"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="w-1/3 bg-gray-200 text-secondary font-bold uppercase py-4 rounded-md hover:bg-gray-300 transition-colors tracking-widest text-lg"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-2/3 bg-brandorange text-white font-bold uppercase py-4 rounded-md hover:bg-brandorange/90 transition-colors tracking-widest text-lg shadow-lg shadow-brandorange/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : "Register Now"}
                                    </button>
                                </div>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
