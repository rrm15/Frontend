"use client";
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Zod validation schema (remains the same)
const communitySchema = z.object({
  name: z.string().min(3, { message: "Community name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  logo: z.string().optional(),
  members: z.array(z.object({
    email: z.string().email({ message: "Invalid email address" }),
    designation: z.enum(["member", "elder", "co-leader", "leader"])
  })).optional()
});

// Type inference
type CommunityFormValues = z.infer<typeof communitySchema>;

const CreateCommunity: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Initialize form with react-hook-form and zod
  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
      members: []
    }
  });

  // Field array for dynamic member addition
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members"
  });

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const onSubmit = (data: CommunityFormValues) => {
    console.log("Community Creation Data:", data);
    toast.success(`${data.name} has been successfully created!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 lg:p-8 w-full">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Create New Community</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Logo and Basic Information */}
          <div className="grid md:grid-cols-2 gap-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Community Logo
              </label>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center mb-4">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Community Logo" 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">Upload Logo</span>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoUpload}
                  className="text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Community Name
                </label>
                <input 
                  placeholder="Enter community name" 
                  {...form.register("name")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea 
                  placeholder="Describe the purpose and vision of your community"
                  {...form.register("description")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 min-h-[100px]"
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Member Invitation Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Invite Members</h3>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div 
                  key={field.id} 
                  className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <input 
                    placeholder="Member email" 
                    {...form.register(`members.${index}.email`)}
                    className="w-full sm:flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                  />
                  <select 
                    {...form.register(`members.${index}.designation`)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                  >
                    <option value="">Select Role</option>
                    <option value="member">Member</option>
                    <option value="elder">Elder</option>
                    <option value="co-leader">Co-Leader</option>
                    <option value="leader">Leader</option>
                  </select>
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="w-full sm:w-auto bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                type="button" 
                onClick={() => append({ email: "", designation: "member" })}
                className="bg-gradient-to-r from-[var(--primary-start)] via-[var(--primary-mid)] to-[var(--primary-end)] 
                text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                Add Member
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button 
              type="submit"
              className="bg-gradient-to-r from-[var(--primary-start)] via-[var(--primary-mid)] to-[var(--primary-end)]
              text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 font-medium w-full"
            >
              Create Community
            </button>
          </div>
        </form>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-viewport"
      />
    </div>
  );
};

export default CreateCommunity;