import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getMyAssets, getUserAssets } from "../services/assetService";

function useUserAsset(userId) {
  const { isLoading, data: assets } = useQuery({
    queryKey: ["userAssets", userId],
    queryFn: () => getUserAssets(userId),
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return { isLoading, assets };
}

export default useUserAsset;