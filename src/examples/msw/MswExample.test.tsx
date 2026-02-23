import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { server } from "../../mocks/node";
import { MswExample } from "./MswExample";
import * as stories from "./MswExample.stories";

const { Success, Error } = composeStories(stories);

describe("[Behaviour] MswExample", () => {
    it("renders the user profile when the request succeeds", async () => {
        server.use(...stories.successHandlers);
        render(<MswExample />);

        expect(await screen.findByText("John Maverick")).toBeInTheDocument();
    });

    it("renders an error message when the request fails", async () => {
        server.use(...stories.errorHandlers);
        render(<MswExample />);

        const error = await screen.findByLabelText("error");
        expect(error).toHaveTextContent("Failed to load user");
    });
});

describe("[Smoke] MswExample stories", () => {
    it("renders the Success story state", async () => {
        server.use(...stories.successHandlers);
        render(<Success />);

        expect(await screen.findByText("John Maverick")).toBeInTheDocument();
    });

    it("renders the Error story state", async () => {
        server.use(...stories.errorHandlers);
        render(<Error />);

        const error = await screen.findByLabelText("error");
        expect(error).toHaveTextContent("Failed to load user");
    });
});
