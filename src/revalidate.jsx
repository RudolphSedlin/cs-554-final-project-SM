"use server"

import { revalidatePath } from "next/cache";

export const refreshPage = async() => {
    revalidatePath('/', 'layout');
}