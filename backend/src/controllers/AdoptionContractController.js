const path = require('path');
const fs   = require('fs');
const AdoptionContract = require('../models/AdoptionContract');
const Animal = require('../models/Animal');

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'contracts');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

module.exports = {
  async show(req, res) {
    try {
      const animal = await Animal.findById(req.params.id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      const contracts = await AdoptionContract.findByAnimal(req.params.id);
      res.json(contracts);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar contratos.' });
    }
  },

  async upload(req, res) {
    try {
      const animal = await Animal.findById(req.params.id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });

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

      const id = await AdoptionContract.create({
        animal_id: req.params.id,
        filename,
        original_name: file.name
      });

      res.json({ id, contract_url: `/uploads/contracts/${filename}`, original_name: file.name });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao salvar contrato.' });
    }
  },

  async destroy(req, res) {
    try {
      const animal = await Animal.findById(req.params.id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      const contract = await AdoptionContract.findById(req.params.contractId);
      if (!contract) return res.status(404).json({ error: 'Contrato não encontrado.' });
      // Garante que o contrato pertence ao animal do usuário logado
      if (contract.animal_id != req.params.id) return res.status(404).json({ error: 'Contrato não encontrado.' });
      await AdoptionContract.delete(req.params.contractId);
      const filepath = path.join(uploadDir, contract.filename);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover contrato.' });
    }
  }
};
