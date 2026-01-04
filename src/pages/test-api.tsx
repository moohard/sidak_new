import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllReferensi } from "../redux/slices/referensiSlice";

const TestApiPage = () => {
  const dispatch = useAppDispatch();
  const referensi = useAppSelector((state) => state.referensi);

  useEffect(() => {
    dispatch(fetchAllReferensi());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1>API Test Page</h1>
      <p>Status: {referensi.loading ? "Loading..." : "Idle"}</p>
      {referensi.error && <p className="text-danger">Error: {referensi.error}</p>}
      
      <h3>Data Referensi (Agama):</h3>
      <ul>
        {referensi.agama.map((item: any, idx: number) => (
          <li key={idx}>{item.agama}</li>
        ))}
      </ul>
      
      <h3>Data Referensi (Unit):</h3>
      <ul>
        {referensi.unit.slice(0, 5).map((item: any, idx: number) => (
          <li key={idx}>{item.unit_kerja}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestApiPage;
