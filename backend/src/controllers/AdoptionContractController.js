const path = require('path');
const fs   = require('fs');
const AdoptionContract = require('../models/AdoptionContract');

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'contracts');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

module.exports = {
  async show(req, res) {
    try {
      const contract = await AdoptionContract.findByAnimal(req.params.id);
      if (!contract) return res.status(404).json({ error: 'Nenhum contrato encontrado.' });
      res.json(contract);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar contrato.' });
    }
  },

  async upload(req, res) {
    try {
      if (!req.files?.contract) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }

      const file = req.files.contract;
      const ext = path.extname(file.name).toLowerCase();
      if (ext !== '.pdf') {
        return res.status(400).json({ error: 'Apenas arquivos PDF são permitidos.' });
      }

      const filename = `contract-${req.params.id}-${Date.now()}.pdf`;
      const filepath = path.join(uploadDir, filename);

      await file.mv(filepath);

      const existing = await AdoptionContract.findByAnimal(req.params.id);
      if (existing) {
        const oldPath = path.join(uploadDir, existing.filename);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        await AdoptionContract.delete(req.params.id);
      }

      await AdoptionContract.create({
        animal_id: req.params.id,
        filename,
        original_name: file.name
      });

      res.json({ contract_url: `/uploads/contracts/${filename}`, original_name: file.name });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao salvar contrato.' });
    }
  },

  async destroy(req, res) {
    try {
      const contract = await AdoptionContract.delete(req.params.id);
      if (!contract) return res.status(404).json({ error: 'Nenhum contrato encontrado.' });
      const filepath = path.join(uploadDir, contract.filename);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover contrato.' });
    }
  }
};
