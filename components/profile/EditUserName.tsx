"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserName } from "@/actions/user";
import { toast } from "sonner";
import { Pencil, X, Check } from "lucide-react";

interface EditUserNameProps {
  initialValue: string;
  className?: string;
}

export function EditUserName({ 
  initialValue, 
  className 
}: EditUserNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await updateUserName(formData);

    if (result.error) {
      toast.error(result.error);
      setIsEditing(false);
      return;
    }

    if (result.success) {
      toast.success(result.success);
      setValue(formData.get("name") as string);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <form action={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          name="name"
          defaultValue={value}
          className={`w-full ${className}`}
          required
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="outline"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="outline" 
          onClick={handleEditToggle}
        >
          <X className="w-4 h-4" />
        </Button>
      </form>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <h1 className="text-3xl font-bold tracking-wide text-primary">
        {value}
      </h1>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleEditToggle}
      >
        <Pencil className="w-4 h-4" />
      </Button>
    </div>
  );
}