import { useCallback, useState } from "react";
import { getRandomNormalDare, getRandomPunishmentDare, Dare } from "./api";

export function useDares() {
  const [currentDare, setCurrentDare] = useState<Dare | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomDare = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dare = await getRandomNormalDare();
      if (!dare) {
        setError("No dares found. Please add some to the database.");
      }
      setCurrentDare(dare);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch dare");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPunishmentDare = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dare = await getRandomPunishmentDare();
      if (!dare) {
        setError("No punishment dares found. Please add some.");
        return;
      }
      setCurrentDare(dare);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch punishment dare");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { currentDare, isLoading, error, getRandomDare, getPunishmentDare };
}
