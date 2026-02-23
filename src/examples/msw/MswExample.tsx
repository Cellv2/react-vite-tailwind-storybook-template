import { useEffect, useState } from "react";

type User = {
    id: string;
    firstName: string;
    lastName: string;
};

export const MswExample = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const loadUser = async () => {
            try {
                const response = await fetch("https://api.example.com/user");
                if (!response.ok) {
                    throw new Error("Failed to load user");
                }

                const data = (await response.json()) as User;
                if (isActive) {
                    setUser(data);
                }
            } catch (error: unknown) {
                if (!isActive) {
                    return;
                }

                if (error instanceof Error) {
                    setError(error.message);
                    return;
                }

                setError("Unexpected error");
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadUser();

        return () => {
            isActive = false;
        };
    }, []);

    if (isLoading) {
        return <p aria-label="loading">Loading user...</p>;
    }

    if (error) {
        return (
            <p role="alert" aria-label="error">
                {error}
            </p>
        );
    }

    if (!user) {
        return <p aria-label="empty">No user</p>;
    }

    return (
        <section>
            <h2>User profile</h2>
            <p>
                {user.firstName} {user.lastName}
            </p>
        </section>
    );
};
