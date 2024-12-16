// import { db } from "@/lib/db";
// import { z } from "zod";
// import { currentUser } from "@/lib/auth";
// import { MemberRole } from "@prisma/client";
// import { ActionResponse } from "@/types/action-response";

// // Validation schema matching the Zod schema in the frontend
// const communitySchema = z.object({
//   name: z.string().min(3, { message: "Community name must be at least 3 characters" }),
//   description: z.string().min(10, { message: "Description must be at least 10 characters" }),
//   logo: z.string().optional(),
//   members: z.array(z.object({
//     email: z.string().email({ message: "Invalid email address" }),
//     designation: z.enum(["member", "elder", "co-leader", "leader"])
//   })).optional()
// });

// /**
//  * Check if a user is already a member of any community
//  * @param userId - The ID of the user to check
//  * @returns boolean - True if user is already in a community, false otherwise
//  */
// export async function isUserInAnyCommunity(userId: string): Promise<boolean> {
//   try {
//     const existingMembership = await db.communityMember.findFirst({
//       where: { 
//         community: {
//           creatorId: userId
//         }
//       }
//     });

//     return !!existingMembership;
//   } catch (error) {
//     console.error("Error checking user community membership:", error);
//     return true; // Fail safe to prevent multiple community joins
//   }
// }

// /**
//  * Check if a community name already exists
//  * @param name - The name of the community to check
//  * @returns boolean - True if community name exists, false otherwise
//  */
// export async function isCommunityNameTaken(name: string): Promise<boolean> {
//   try {
//     const existingCommunity = await db.community.findUnique({
//       where: { name }
//     });

//     return !!existingCommunity;
//   } catch (error) {
//     console.error("Error checking community name:", error);
//     return true; // Fail safe to prevent duplicate names
//   }
// }

// /**
//  * Create a new community
//  * @param data - Community creation data
//  * @returns ActionResponse with success status and message
//  */
// export async function createCommunity(data: z.infer<typeof communitySchema>): Promise<ActionResponse> {
//   // Validate input
//   const validationResult = communitySchema.safeParse(data);
//   if (!validationResult.success) {
//     return {
//       success: false,
//       error: validationResult.error.errors[0].message
//     };
//   }

//   // Get current user
//   const user = await currentUser();
//   if (!user) {
//     return {
//       success: false,
//       error: "You must be logged in to create a community"
//     };
//   }

//   // Check if user is already in a community
//   const isInCommunity = await isUserInAnyCommunity(user.id);
//   if (isInCommunity) {
//     return {
//       success: false,
//       error: "You are already a member of a community"
//     };
//   }

//   // Check if community name is taken
//   const nameTaken = await isCommunityNameTaken(data.name);
//   if (nameTaken) {
//     return {
//       success: false,
//       error: "A community with this name already exists"
//     };
//   }

//   try {
//     // Create community transaction
//     const newCommunity = await db.$transaction(async (prisma) => {
//       // Create the community
//       const community = await prisma.community.create({
//         data: {
//           name: data.name,
//           description: data.description,
//           logo: data.logo || '',
//           creatorId: user.id
//         }
//       });

//       // Create community members (including the creator)
//       const memberData = [
//         // Add the creator as a leader
//         {
//           email: user.email || '',
//           role: MemberRole.LEADER,
//           communityId: community.id
//         },
//         // Add additional invited members
//         ...(data.members?.map(member => ({
//           email: member.email,
//           role: member.designation.toUpperCase() as MemberRole,
//           communityId: community.id
//         })) || [])
//       ];

//       await prisma.communityMember.createMany({
//         data: memberData
//       });

//       return community;
//     });

//     return {
//       success: true,
//       data: newCommunity,
//       message: "Community created successfully"
//     };
//   } catch (error) {
//     console.error("Community creation error:", error);
//     return {
//       success: false,
//       error: "Failed to create community. Please try again."
//     };
//   }
// }

// /**
//  * Get community details for a user
//  * @param userId - The ID of the user
//  * @returns Community details or null
//  */
// export async function getUserCommunity(userId: string) {
//   try {
//     return await db.community.findFirst({
//       where: { 
//         OR: [
//           { creatorId: userId },
//           { members: { some: { email: { in: [userId] } } } }
//         ]
//       },
//       include: {
//         members: true,
//         _count: {
//           select: { members: true }
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching user community:", error);
//     return null;
//   }
// }