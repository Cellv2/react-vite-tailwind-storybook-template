import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";

import { MswExample } from "./MswExample";

const meta = {
    title: "Examples/MSW/MswExample",
    component: MswExample,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MswExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const successHandlers = [
    http.get("https://api.example.com/user", () => {
        return HttpResponse.json({
            id: "abc-123",
            firstName: "John",
            lastName: "Maverick",
        });
    }),
];

export const errorHandlers = [
    http.get("https://api.example.com/user", () => {
        return new HttpResponse(null, { status: 500 });
    }),
];

export const Success: Story = {
    parameters: {
        msw: {
            handlers: successHandlers,
        },
    },
};

export const Error: Story = {
    parameters: {
        msw: {
            handlers: errorHandlers,
        },
    },
};
