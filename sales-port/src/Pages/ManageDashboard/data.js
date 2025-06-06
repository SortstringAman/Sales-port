import openIndentIcon from '../../assets/icons/open-indent.svg'
import openPosIcon from '../../assets/icons/open-pos.svg'
import lowStockIcon from '../../assets/icons/low-stock.svg'
import totalStockIcon from '../../assets/icons/total-stock-items.svg'
import stockValueIcon from '../../assets/icons/stock-value.svg'
// dashboardData.js
export const dashboardData = [
  {
    title: "Open Indents",
    value: 14,
    subtitle: "2 new today",
    icon: openIndentIcon,
    color: "primary",
  },
  {
    title: "Open POs",
    value: 7,
    subtitle: "1 overdue",
    icon: openPosIcon,
    color: "purple",
  },
  {
    title: "Low Stock Items",
    value: 5,
    subtitle: "3 below reorder",
    icon: lowStockIcon,
    color: "danger",
  },
  {
    title: "Total Stock Items",
    value: 162,
    subtitle: "All categories",
    icon: totalStockIcon,
    color: "success",
  },
  {
    title: "Stock Value",
    value: "₹8.5L",
    subtitle: "Current inventory",
    icon: stockValueIcon,
    color: "warning",
  },
];
 


export const stockData = [
  {
    productName: "A4 Paper",
    currentStock: 12,
    reorderLevel: 30,
    lastStockIn: "2025-05-19",
    lastStockOut: "2025-05-20",
    action: "Initiate Purchase",
  },
  {
    productName: "Printer Cartridge",
    currentStock: 3,
    reorderLevel: 10,
    lastStockIn: "2025-05-15",
    lastStockOut: "2025-05-18",
    action: "Initiate Purchase",
  },
  {
    productName: "Stapler Pins",
    currentStock: 4,
    reorderLevel: 15,
    lastStockIn: "2025-05-16",
    lastStockOut: "2025-05-19",
    action: "Initiate Purchase",
  },
  {
    productName: "Toner",
    currentStock: 0,
    reorderLevel: 5,
    lastStockIn: "2025-05-10",
    lastStockOut: "2025-05-18",
    action: "Urgent Purchase",
  },
];


 
export const lowStockAlert = [
    {
        id:1,
        productName:'Paper Rolls',
        current:12,
        reorder:30,
       lastStockIn:"2025-08-02",
        action:'Raise PO'
    },
    {
        id:2,
        productName:'Ink Black',
        current:8,
        reorder:20,
       lastStockIn:"2025-05-12",
        action:'Raise PO'
    },
        {
        id:3,
        productName:'Adhensive',
        current:5,
        reorder:15,
        lastStockIn:"2025-05-12",
        action:'Raise PO'
    }

]
