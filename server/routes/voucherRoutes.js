import express from 'express';
import {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  applyVoucher,          
} from '../controllers/voucherController.js';

const router = express.Router();

router.get('/', getVouchers);
router.get('/:id', getVoucherById);
router.post('/', createVoucher);
router.put('/:id', updateVoucher);
router.delete('/:id', deleteVoucher);
router.post('/apply', applyVoucher);  
export default router;