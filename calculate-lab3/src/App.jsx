// 1. นำเข้า Component หลักของเครื่องคิดเลข
// สังเกต path ให้ดีนะครับ ต้องตรงกับที่ไฟล์อยู่จริง
import CalculatorApp from './componens/calculator/CalculatorApp';

// (Optional) ถ้ามี css กลางของ App สามารถ import ตรงนี้ได้
import './App.css'; 

function App() {
  return (
    // 2. จัด Layout หลักของหน้าเว็บ (ถ้าต้องการ)
    <div className="app-container">
      
      {/* (Optional) ใส่หัวข้อโปรเจกต์สักหน่อย */}
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        React Calculator Assignment
      </h1>

      {/* 3. เรียกใช้เครื่องคิดเลข */}
      <CalculatorApp />
      
    </div>
  );
}

export default App;