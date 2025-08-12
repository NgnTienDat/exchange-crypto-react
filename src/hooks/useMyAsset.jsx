import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getMyAssets } from "../services/assetService";

function useMyAsset() {
  const { isLoading, data: assets } = useQuery({
    queryKey: ["myAssets"],
    queryFn: getMyAssets,
    retry: 1,
    enabled: !!getAccessToken(),
    placeholderData: null,
  });

  return { isLoading, assets };
}

export default useMyAsset;