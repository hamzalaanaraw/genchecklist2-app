
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  AppTripChecklist, AppMovingChecklist, AppPetChecklist, AppEventChecklist,
  AppNewBeginningsChecklist, AppProjectGoalChecklist, ChecklistType,
  DisplayListItem, DisplayMovingTask, DisplayPetChecklistItem, DisplayEventTask,
  DisplayNewBeginningsTask, DisplayProjectGoalTask
} from '../types';

// Helper to format item status (packed, completed, acquired)
const formatStatus = (done: boolean): string => (done ? '[X] ' : '[ ] ');

export const downloadChecklistPdf = (
  checklistData: any, // This will be cast to a specific type inside the switch
  checklistType: ChecklistType,
  listTitle: string // The main title for the PDF (e.g., "Craft Your Perfect Trip Packing List")
): void => {
  const doc = new jsPDF();
  const today = new Date().toISOString().split('T')[0];
  // Sanitize title for filename
  const sanitizedListTitle = listTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
  const filename = `GenChecklist_${checklistType.replace('_', '-')}_${sanitizedListTitle}_${today}.pdf`;

  doc.setFontSize(18);
  doc.text(listTitle, 14, 20);
  doc.setFontSize(10);
  doc.text(`Generated on: ${today}`, 14, 26);

  let startY = 35; // Initial Y position for the first table

  // Check if checklistData is null or empty before proceeding
  if (!checklistData || (Array.isArray(checklistData) && checklistData.length === 0)) {
    doc.setFontSize(12);
    doc.text("This checklist is currently empty.", 14, startY);
    doc.save(filename);
    return;
  }

  try {
    switch (checklistType) {
      case ChecklistType.TRIP:
        const tripData = checklistData as AppTripChecklist;
        tripData.forEach(category => {
          autoTable(doc, {
            startY: startY,
            head: [[{ content: category.name, colSpan: 2, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
            body: category.items.map((item: DisplayListItem) => [
              formatStatus(item.packed) + item.itemName,
              item.quantitySuggestion || '-',
            ]),
            columns: [
              { header: 'Item', dataKey: 'item' },
              { header: 'Quantity', dataKey: 'quantity' },
            ],
            theme: 'striped',
            headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] }, // slate-700
            columnStyles: {
              0: { cellWidth: 'auto' }, // Item name takes remaining width
              1: { cellWidth: 40, halign: 'center' },
            },
            didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }, // Reset startY for new page
          });
          startY = (doc as any).lastAutoTable.finalY + 10;
        });
        break;

      case ChecklistType.MOVING:
        const movingData = checklistData as AppMovingChecklist;
        movingData.forEach(week => {
          autoTable(doc, {
            startY: startY,
            head: [[{ content: week.week, colSpan: 3, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
            body: week.tasks.map((task: DisplayMovingTask) => [
              formatStatus(task.completed) + task.taskName,
              task.notes || '-',
              task.deadline || '-',
            ]),
            columns: [
              { header: 'Task', dataKey: 'task' },
              { header: 'Notes', dataKey: 'notes' },
              { header: 'Deadline', dataKey: 'deadline' },
            ],
            theme: 'striped',
            headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] },
            columnStyles: {
               0: { cellWidth: 75 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 35, halign: 'left' }
            },
            didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }
          });
          startY = (doc as any).lastAutoTable.finalY + 10;
        });
        break;

      case ChecklistType.PET:
        const petData = checklistData as AppPetChecklist;
        petData.forEach(section => {
          autoTable(doc, {
            startY: startY,
            head: [[{ content: section.sectionName, colSpan: 3, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
            body: section.items.map((item: DisplayPetChecklistItem) => [
              formatStatus(item.acquired) + item.itemName,
              item.quantitySuggestion || '-',
              item.notes || '-',
            ]),
            columns: [
              { header: 'Item', dataKey: 'item' },
              { header: 'Quantity', dataKey: 'quantity' },
              { header: 'Notes', dataKey: 'notes' },
            ],
            theme: 'striped',
            headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] },
            columnStyles: {
               0: { cellWidth: 75 }, 1: { cellWidth: 35, halign: 'center' }, 2: { cellWidth: 'auto' }
            },
            didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }
          });
          startY = (doc as any).lastAutoTable.finalY + 10;
        });
        break;

      case ChecklistType.EVENT:
          const eventData = checklistData as AppEventChecklist;
          eventData.forEach(section => {
              autoTable(doc, {
                  startY: startY,
                  head: [[{ content: section.sectionName, colSpan: 3, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
                  body: section.tasks.map((task: DisplayEventTask) => [
                      formatStatus(task.completed) + task.taskName,
                      task.suggestedTimeline || '-',
                      task.notes || '-',
                  ]),
                  columns: [
                      { header: 'Task', dataKey: 'task' },
                      { header: 'Timeline', dataKey: 'timeline' },
                      { header: 'Notes', dataKey: 'notes' },
                  ],
                  theme: 'striped',
                  headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] },
                  columnStyles: {
                      0: { cellWidth: 75 }, 1: { cellWidth: 45, halign: 'left' }, 2: { cellWidth: 'auto' }
                  },
                  didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }
              });
              startY = (doc as any).lastAutoTable.finalY + 10;
          });
          break;

      case ChecklistType.NEW_BEGINNINGS:
          const newBeginningsData = checklistData as AppNewBeginningsChecklist;
          newBeginningsData.forEach(section => {
              autoTable(doc, {
                  startY: startY,
                  head: [[{ content: section.sectionName, colSpan: 4, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
                  body: section.tasks.map((task: DisplayNewBeginningsTask) => [
                      formatStatus(task.completed) + task.taskName,
                      task.importance || '-',
                      task.suggestedTimeline || '-',
                      task.notes || '-',
                  ]),
                  columns: [
                      { header: 'Task', dataKey: 'task' },
                      { header: 'Importance', dataKey: 'importance' },
                      { header: 'Timeline', dataKey: 'timeline' },
                      { header: 'Notes', dataKey: 'notes' },
                  ],
                  theme: 'striped',
                  headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] },
                   columnStyles: {
                      0: { cellWidth: 60 }, 1: { cellWidth: 30, halign: 'center' }, 2: {cellWidth: 40, halign: 'left'}, 3: { cellWidth: 'auto' }
                  },
                  didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }
              });
              startY = (doc as any).lastAutoTable.finalY + 10;
          });
          break;

      case ChecklistType.PROJECT_GOAL:
          const projectGoalData = checklistData as AppProjectGoalChecklist;
          projectGoalData.forEach(phase => {
              autoTable(doc, {
                  startY: startY,
                  head: [[{ content: phase.phaseName, colSpan: 4, styles: { halign: 'left', fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } }]],
                  body: phase.tasks.map((task: DisplayProjectGoalTask) => [
                      formatStatus(task.completed) + task.taskName,
                      task.priority || '-',
                      task.suggestedTimelineOrEffort || '-',
                      task.details || '-',
                  ]),
                  columns: [
                      { header: 'Task', dataKey: 'task' },
                      { header: 'Priority', dataKey: 'priority' },
                      { header: 'Timeline/Effort', dataKey: 'effort' },
                      { header: 'Details', dataKey: 'details' },
                  ],
                  theme: 'striped',
                  headStyles: { fontStyle: 'bold', fillColor: [75, 85, 99] },
                  columnStyles: {
                      0: { cellWidth: 60 }, 1: { cellWidth: 30, halign: 'center' }, 2: {cellWidth: 40, halign: 'left'}, 3: { cellWidth: 'auto' }
                  },
                  didDrawPage: (data) => { startY = data.cursor?.y ? data.cursor.y + 10 : 0; }
              });
              startY = (doc as any).lastAutoTable.finalY + 10;
          });
          break;

      default:
        console.error("Unknown checklist type for PDF generation:", checklistType);
        doc.setFontSize(12);
        doc.text("Unsupported checklist type for PDF generation.", 14, startY);
    }

    // Check if any tables were actually drawn. lastAutoTable might not be set if data was empty.
    if ((doc as any).lastAutoTable && (doc as any).lastAutoTable.finalY > 0) {
       doc.save(filename);
    } else if (startY <= 35) { // No tables drawn, likely because the initial check for empty data didn't catch specific empty substructures.
        doc.setFontSize(12);
        doc.text("No content available to generate PDF for this checklist.", 14, startY);
        doc.save(filename); // Save with the "empty" message.
    }
    // If the above conditions don't cover it, it means the switch completed, but no tables were made.
    // This could happen if, for example, tripData was valid but had no categories.
    // The initial empty check should ideally handle this better, but as a fallback:
    else if (!(doc as any).lastAutoTable || !((doc as any).lastAutoTable.finalY > 0)) {
        doc.setFontSize(12);
        doc.text("The checklist appears to be empty or in an unexpected format. PDF could not be generated with content.", 14, startY);
        doc.save(filename);
    }


  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please check the console for details.");
    // Optionally, generate a simple PDF with an error message
    const errorDoc = new jsPDF();
    errorDoc.text("Error generating PDF.", 14, 20);
    if (error instanceof Error) {
        errorDoc.text(error.message, 14, 30);
    }
    errorDoc.save(`Error_PDF_Generation_${today}.pdf`);
  }
};
