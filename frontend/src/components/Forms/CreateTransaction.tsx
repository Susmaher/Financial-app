import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const createTransactionShema = z.object({
    name: z.string().min(1, "the email field is required"),
    category: z.string().min(1, "the category fiel is required"),
});

type createTransactionValues = z.infer<typeof createTransactionShema>;

export function CreateTransaction(): JSX.Element {
    const { register, reset } = useForm<createTransactionValues>({
        resolver: zodResolver(createTransactionShema),
    });

    return <></>;
}
