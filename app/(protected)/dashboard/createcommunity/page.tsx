"use client";
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const Card = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

// Zod validation schema
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
  const [invitationLink, setInvitationLink] = useState<string | null>(null);

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

  // Generate invitation link
  const generateInvitationLink = () => {
    const link = `https://yourcommunity.com/invite/${Math.random().toString(36).substring(7)}`;
    setInvitationLink(link);
    toast.success("Invitation Link Generated! Share this link with potential community members.");
  };

  // Copy invitation link
  const copyInvitationLink = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink);
      toast.success("Invitation link copied to clipboard!");
    }
  };

  // Form submission handler
  const onSubmit = (data: CommunityFormValues) => {
    console.log("Community Creation Data:", data);
    toast.success(`${data.name} has been successfully created!`);
  };

  return (
    <Card>
      <h2>Create New Community</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Logo and Basic Information */}
        <FormField>
          <FormLabel>Community Logo</FormLabel>
          <Avatar>
            {logoPreview ? (
              <img src={logoPreview} alt="Community Logo" style={{ borderRadius: '50%', width: '100%', height: '100%' }} />
            ) : (
              <span>Upload Logo</span>
            )}
          </Avatar>
          <Input type="file" accept="image/*" onChange={handleLogoUpload} />
        </FormField>

        <FormField>
          <FormLabel>Community Name</FormLabel>
          <Input placeholder="Enter community name" {...form.register("name")} />
        </FormField>

        <FormField>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Describe the purpose and vision of your community" {...form.register("description")} />
        </FormField>

        {/* Member Invitation Section */}
        <h3>Invite Members</h3>
        <div>
          {fields.map((field, index) => (
            <MemberContainer key={field.id}>
              <Input placeholder="Member email" {...form.register(`members.${index}.email`)} />
              <Select {...form.register(`members.${index}.designation`)}>
                <option value="">Select Role</option>
                <option value="member">Member</option>
                <option value="elder">Elder</option>
                <option value="co-leader">Co-Leader</option>
                <option value="leader">Leader</option>
              </Select>
              <Button type="button" onClick={() => remove(index)}>Remove</Button>
            </MemberContainer>
          ))}
        </div>
        <Button 
          type="button" 
          onClick={() => append({ email: "", designation: "member" })}
          className="bg-gradient-to-r from-[var(--primary-start)] via-[var(--primary-mid)] to-[var(--primary-end)] 
          text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200 mr-4 mb-4"
        >
          Add Member
        </Button>

        {/* Submit Button */}
        <Button 
          type="submit"
          className="bg-gradient-to-r from-[var(--primary-start)] via-[var(--primary-mid)] to-[var(--primary-end)]
          text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-200 font-medium"
        >
          Create Community
        </Button>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default CreateCommunity;