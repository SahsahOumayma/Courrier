// ✅ depart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-depart',
  standalone: true,
  templateUrl: './depart.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DepartComponent {
  courriers = [
    {
      numero: 'DPT-001',
      objet: 'Lettre au ministère',
      recepteur: 'Ministère de la Santé',
      dateEnvoi: '2025-05-08',
      numeroReponse: 'REP-2025-01',
      dateReponse: '2025-05-10',
      description: 'Envoi du rapport annuel'
    },
    {
      numero: 'DPT-002',
      objet: 'Transmission dossier',
      recepteur: 'Inspection Régionale',
      dateEnvoi: '2025-05-09',
      numeroReponse: '',
      dateReponse: '',
      description: 'Documents justificatifs du projet'
    }
  ];

  telechargerPDF(courrier: any) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR');
    const referenceUnique = 'REF-DPT-' + today.getTime();

    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/56/MS-Maroc.png';
    doc.addImage(logoUrl, 'PNG', pageWidth / 2 - 30, 10, 60, 35);

    const yTitre = 65;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('COURRIER DÉPART', pageWidth / 2, yTitre, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120);
    doc.text(`Document généré le : ${dateStr}`, pageWidth / 2, yTitre + 8, { align: 'center' });
    doc.text(`Référence : ${referenceUnique}`, pageWidth / 2, yTitre + 13, { align: 'center' });

    const yTableau = yTitre + 28;
    autoTable(doc, {
      startY: yTableau,
      margin: { left: 25, right: 25 },
      theme: 'grid',
      head: [['CHAMP', 'VALEUR']],
      body: [
        ['N° D’ORDRE', `${courrier.numero}`],
        ['OBJET', `${courrier.objet}`],
        ['DESTINATAIRE', courrier.recepteur],
        ['DATE D’ENVOI', courrier.dateEnvoi],
        ['RÉPONSE', `Répondu : ${courrier.numeroReponse || '—'}\nLe : ${courrier.dateReponse || '—'}`],
        ['DESCRIPTION', courrier.description]
      ],
      styles: {
        fontSize: 11,
        font: 'helvetica',
        valign: 'middle',
        cellPadding: { top: 6, bottom: 6, left: 4, right: 4 },
        textColor: [33, 33, 33],
        lineColor: [0, 0, 0],
        lineWidth: 0.2
      },
      headStyles: {
  fillColor: [0, 67, 117], // ← ici la couleur bleu foncé (ligne entière de l'en-tête)
  textColor: 255,
  fontStyle: 'bold',
  halign: 'center'
}
    });

    doc.setFontSize(8);
    doc.setFont('times', 'italic');
    doc.setTextColor(110);
    doc.text(
      'Cachet numérique • Délégation de la santé – Ministère de la Santé – Royaume du Maroc\nDocument généré automatiquement • Version sécurisée',
      pageWidth / 2,
      pageHeight - 12,
      { align: 'center' }
    );

    doc.save(`${courrier.numero}-depart.pdf`);
  }
}