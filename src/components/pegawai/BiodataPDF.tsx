import React from "react";
import { Table } from "reactstrap";

interface BiodataPDFProps {
  pegawai: any;
  jabatan: any[];
  pangkat: any[];
  pendidikan: any[];
  keluarga: any[];
}

const BiodataPDF = React.forwardRef<HTMLDivElement, BiodataPDFProps>((props, ref) => {
  const { pegawai, jabatan, pangkat, pendidikan, keluarga } = props;

  return (
    <div ref={ref} className="p-5" style={{ color: "#000" }}>
      <div className="text-center mb-4">
        <h4>DAFTAR RIWAYAT HIDUP</h4>
        <h5>{pegawai.nama}</h5>
        <p>NIP: {pegawai.nip}</p>
      </div>

      <section className="mb-4">
        <h6>I. DATA PRIBADI</h6>
        <Table borderless size="sm">
          <tbody>
            <tr><td width="30%">Nama Lengkap</td><td>: {pegawai.nama}</td></tr>
            <tr><td>Tempat, Tgl Lahir</td><td>: {pegawai.tempat_lahir}, {pegawai.tgl_lahir}</td></tr>
            <tr><td>Jenis Kelamin</td><td>: {pegawai.jenis_kelamin}</td></tr>
            <tr><td>Agama</td><td>: {pegawai.agama}</td></tr>
            <tr><td>Alamat</td><td>: {pegawai.alamat}</td></tr>
          </tbody>
        </Table>
      </section>

      <section className="mb-4">
        <h6>II. RIWAYAT PENDIDIKAN</h6>
        <Table bordered size="sm">
          <thead>
            <tr><th>Tingkat</th><th>Nama Sekolah</th><th>Tahun Lulus</th><th>No. Ijazah</th></tr>
          </thead>
          <tbody>
            {pendidikan.map((p, i) => (
              <tr key={i}><td>{p.tingkat_pendidikan}</td><td>{p.nama_sekolah}</td><td>{p.thn_lulus}</td><td>{p.no_ijazah}</td></tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="mb-4">
        <h6>III. RIWAYAT JABATAN</h6>
        <Table bordered size="sm">
          <thead>
            <tr><th>Jabatan</th><th>Unit Kerja</th><th>TMT</th><th>No. SK</th></tr>
          </thead>
          <tbody>
            {jabatan.map((j, i) => (
              <tr key={i}><td>{j.jabatan}</td><td>{j.unit_kerja}</td><td>{j.tmt_jabatan}</td><td>{j.no_sk}</td></tr>
            ))}
          </tbody>
        </Table>
      </section>

      <div className="text-end mt-5">
        <p>Dicetak pada: {new Date().toLocaleDateString("id-ID")}</p>
      </div>
    </div>
  );
});

BiodataPDF.displayName = "BiodataPDF";

export default BiodataPDF;
