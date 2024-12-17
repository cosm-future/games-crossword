window.addEventListener('load', () => {

if (!localStorage.getItem('isReloaded')) {
    localStorage.setItem('isReloaded', 'true');
    location.reload();
} else {
    localStorage.removeItem('isReloaded');
}

  });

 
  
  
  // Создаем новый элемент div
  var backgroundDiv = document.createElement('div');
  
  // Добавляем id и class
  backgroundDiv.id = 'background';
  backgroundDiv.className = 'background-class';
  
  // Добавляем созданный div в body
  document.body.appendChild(backgroundDiv);
  
  
  
  // Проверяем, есть ли значение liCount в локальном хранилище
  let liCount = parseInt(localStorage.getItem('liCount')) || 0;
  
  
  
  // Создаем переменную для хранения состояния кнопки
  let showAnswers = localStorage.getItem('showAnswers') === 'true' ? true : false;
  
  let ShowAdvancedMode = JSON.parse(localStorage.getItem('ShowAdvancedMode')) || false; // получаем значение из локального хранилища, по умолчанию устанавливаем false
  
  // функция, которая изменяет значение ShowAdvancedMode, сохраняет его в локальное хранилище и перезагружает страницу
  function toggleAdvancedMode() {
    ShowAdvancedMode = !ShowAdvancedMode; // меняем значение на противоположное
    localStorage.setItem('ShowAdvancedMode', JSON.stringify(ShowAdvancedMode)); // сохраняем значение в локальное хранилище
    location.reload(); // перезагружаем страницу
  }
  
  document.addEventListener('keydown', function(event) {
    if (event.code === 'F8' && event.shiftKey) {
      ShowAdvancedMode = !ShowAdvancedMode; // меняем значение переменной ShowAdvancedMode на противоположное
      localStorage.setItem('ShowAdvancedMode', ShowAdvancedMode); // сохраняем значение переменной ShowAdvancedMode в локальное хранилище
      location.reload(); // перезагружаем страницу
    }
  });
  
  // Создаем элемент кнопки
  const buttonAbsolute = document.createElement('button');
  
  // Устанавливаем id и class
  buttonAbsolute.id = 'my-button';
  buttonAbsolute.className = 'my-class-btn-general';
  
  // Устанавливаем текст внутри кнопки
  buttonAbsolute.innerHTML = '<strong style>Режим: </strong>Инженерный';
  
  // Добавляем кнопку внутрь элемента body
  document.body.appendChild(buttonAbsolute);
  
  // Скрываем кнопку, если ShowAdvancedMode равно false
  if (!ShowAdvancedMode) {
    buttonAbsolute.style.display = 'none';
  }
  
  
  // Обновляем текст кнопки в соответствии со значением showAnswers
  if (showAnswers) {
    buttonAbsolute.textContent = 'Скрыть ответы';
    buttonAbsolute.innerHTML = '<strong style>Режим: </strong>Инженерный';
  } else {
    buttonAbsolute.textContent = 'Показать ответы';
    buttonAbsolute.innerHTML = '<strong style>Режим: </strong>Пользовательский';
  }








  
  

// Глобальная переменная
let isFeatureEnabled; 



// Инициализация кнопки
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModal');
const modifyArrayButton = document.getElementById('modifyArray');
const arrayInput = document.getElementById('arrayInput');
const uniqueIdInput = document.getElementById('uniqueId');
const notification = document.getElementById('notification');

// Новые элементы
const rowCountInput = document.getElementById('rowCount');
const colCountInput = document.getElementById('colCount');
const basicGenerationButton = document.getElementById('basicGeneration');
const answersContainer = document.getElementById('answersContainer');
const answersList = document.getElementById('answersList');
const generateCrosswordButton = document.getElementById('generateCrossword');



if(ShowAdvancedMode) {
  isFeatureEnabled = true;
  openModalButton.style.display = "block";
  openModalButton.disabled = false;
} else {
  isFeatureEnabled = false;
  openModalButton.style.display = "none";
  openModalButton.disabled = true;
}

// Открыть/закрыть модальное окно
openModalButton.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});






// Функция базовой генерации массива
function generateBasicArray(rows, cols) {
  const array = Array.from({ length: rows }, () => Array(cols).fill(0));
  return array;
}

// Обработчик кнопки базовой генерации
basicGenerationButton.addEventListener('click', () => {
  try {
      const cols = parseInt(colCountInput.value, 10); // Теперь это количество столбцов
      const rows = parseInt(rowCountInput.value, 10); // А это количество строк

      if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
          alert('Введите корректные размеры массива.');
          return;
      }

      const basicArray = generateBasicArray(rows, cols);
      const formattedArrayString = formatArray(basicArray); // Форматируем массив

      arrayInput.value = formattedArrayString; // Обновляем текст в textarea

      // Уведомление с правильным порядком размеров
      notification.textContent = `Массив сгенерирован с размерами ${cols}x${rows}`;
      notification.style.display = 'block';
      setTimeout(() => {
          notification.style.display = 'none';
      }, 8000);

  } catch (error) {
      alert('Ошибка генерации массива. Убедитесь, что ввод корректен.');
  }
});




// Функция для обновления списка ответов
function updateAnswersList() {
  answersList.innerHTML = '';
  questionsAndAnswers.forEach((item, index) => {
      const listItem = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.answer;
      input.className = 'answer-input';
      input.addEventListener('input', (e) => {
          questionsAndAnswers[index].answer = e.target.value.toUpperCase();
      });

      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.className = 'answer-button';
      addButton.addEventListener('click', () => {
          questionsAndAnswers.splice(index + 1, 0, { question: '.', answer: '' });
          updateAnswersList();
      });

      const removeButton = document.createElement('button');
      removeButton.textContent = '-';
      removeButton.className = 'answer-button';
      removeButton.addEventListener('click', () => {
          if (questionsAndAnswers.length > 1) {
              questionsAndAnswers.splice(index, 1);
              updateAnswersList();
          }
      });

      listItem.appendChild(input);
      listItem.appendChild(addButton);
      listItem.appendChild(removeButton);
      answersList.appendChild(listItem);
  });
}

// Инициализация списка ответов при загрузке
updateAnswersList();



// Функция для изменения массива
function modifyArray(array, uniqueId) {
    return array.map((row, rowIndex) => 
        row.map((item, index) => {
            if (typeof item === 'string' && item.length > 1) {
                const secondChar = item[1];
                const thirdChar = item[2] || '';

                let numbers = '';
                if (!isNaN(secondChar)) numbers += secondChar;
                if (!isNaN(thirdChar)) numbers += thirdChar;

                if (item.includes('г', 2) || item.includes('в', 2)) {
                    item += 'м2';
                } else {
                    item += 'м200000' + numbers;
                }

                item += (index + 1) + uniqueId;
            }
            return item;
        })
    );
}

// Функция копирования текста в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Скопировано в буфер обмена');
    }).catch(err => {
        console.error('Ошибка копирования:', err);
    });
}

// Функция форматирования массива в строку в "человеческом" формате
function formatArray(array) {
    const formattedString = array
        .map(row => 
            `[${row.map(item => (item === 0 ? '0' : `"${item}"`)).join(', ')}]`
        )
        .join(',\n');

    // Добавляем перенос строки после первой скобки и перед последней
    return `[\n${formattedString}\n]`;
}

// Обработчик нажатия кнопки модификации массива
modifyArrayButton.addEventListener('click', () => {
    try {
        const array = JSON.parse(arrayInput.value);
        const uniqueId = uniqueIdInput.value;

        if (!uniqueId) {
            alert('Введите уникальный ID');
            return;
        }

        const modifiedArray = modifyArray(array, uniqueId);
        const formattedArrayString = formatArray(modifiedArray); // Форматируем массив

        arrayInput.value = formattedArrayString; // Обновляем текст в textarea

        notification.style.display = 'block'; // Показываем уведомление
        setTimeout(() => {
            notification.style.display = 'none';
        }, 8000);

        copyToClipboard(formattedArrayString); // Копируем результат в буфер обмена

    } catch (error) {
        alert('Ошибка обработки массива. Убедитесь, что ввод корректен.');
    }
});

// Закрыть модальное окно при нажатии вне области
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});




// Обработчик нажатия на кнопку
generateCrosswordButton.addEventListener('click', () => {
  try {
      // Считываем текущий массив
      const array = JSON.parse(arrayInput.value);

      // Считываем ответы
      const answers = questionsAndAnswers.map(item => item.answer);

      // Преобразуем пустые ячейки (ноль) на значения с ответами
      let modifiedArray = generateCrossword(array, answers);

      // Нормализуем кавычки после добавления всех ответов
      modifiedArray = normalizeQuotes(modifiedArray);

      // Форматируем изменённый массив
      const formattedArrayString = formatArray(modifiedArray);

      // Обновляем текст в textarea
      arrayInput.value = formattedArrayString;

      // Показываем уведомление
      notification.style.display = 'block';
      setTimeout(() => {
          notification.style.display = 'none';
      }, 8000);

      copyToClipboard(formattedArrayString); // Копируем результат в буфер обмена

  } catch (error) {
      alert('Ошибка генерации кроссворда. Убедитесь, что массив правильный.');
  }
});

// Функция для генерации кроссворда
function generateCrossword(array, answers) {
  let updatedArray = JSON.parse(JSON.stringify(array)); // Создаём копию массива

  // Сортируем ответы по длине, начиная с длинных
  const sortedAnswers = [...answers].sort((a, b) => b.length - a.length);

  // Перебираем ответы и размещаем их
  sortedAnswers.forEach((answer, idx) => {
      const answerId = (idx + 1).toString().padStart(2, '0'); // Форматируем ID ответа

      if (!placeAnswer(updatedArray, answer, answerId)) {
          console.warn(`Не удалось разместить ответ: ${answer}`);
      }
  });

  return updatedArray;
}

// Функция для размещения ответа (горизонтально или вертикально)
function placeAnswer(array, answer, answerId) {
  for (let row = 0; row < array.length; row++) {
      for (let col = 0; col < array[row].length; col++) {
          // Пытаемся разместить горизонтально
          if (canPlaceHorizontally(array, answer, row, col)) {
              placeAnswerHorizontally(array, answer, answerId, row, col);
              return true;
          }
          // Пытаемся разместить вертикально
          if (canPlaceVertically(array, answer, row, col)) {
              placeAnswerVertically(array, answer, answerId, row, col);
              return true;
          }
      }
  }
  return false; // Если не удалось разместить
}

// Функция для проверки возможности размещения горизонтального ответа
function canPlaceHorizontally(array, answer, row, col) {
  if (col + answer.length > array[row].length) return false; // Выход за пределы ширины

  for (let i = 0; i < answer.length; i++) {
      const cell = array[row][col + i];
      if (cell !== 0 && cell[0] !== answer[i]) return false; // Проверяем совпадение букв
  }

  return true;
}

// Функция для размещения горизонтального ответа
function placeAnswerHorizontally(array, answer, answerId, row, col) {
  for (let i = 0; i < answer.length; i++) {
      if (i === 0) {
          array[row][col + i] = `${answer[i]}${answerId}г`;
      } else {
          array[row][col + i] = `${answer[i]}00`;
      }
  }
}

// Функция для проверки возможности размещения вертикального ответа
function canPlaceVertically(array, answer, row, col) {
  if (row + answer.length > array.length) return false; // Выход за пределы высоты

  for (let i = 0; i < answer.length; i++) {
      const cell = array[row + i][col];
      if (cell !== 0 && cell[0] !== answer[i]) return false; // Проверяем совпадение букв
  }

  return true;
}

// Функция для размещения вертикального ответа
function placeAnswerVertically(array, answer, answerId, row, col) {
  for (let i = 0; i < answer.length; i++) {
      if (i === 0) {
          array[row + i][col] = `${answer[i]}${answerId}в`;
      } else {
          array[row + i][col] = `${answer[i]}00`;
      }
  }
}

// Функция для нормализации кавычек
function normalizeQuotes(array) {
  return array.map(row => row.map(cell => {
    if (typeof cell === 'string') {
      return cell.replace(/""/g, '"');
    }
    return cell;
  }));
}




















  
  
   
  
  const crossword2 = [
    [0, 0, "М01в", 0, 0],
    [0, "Б00", "В00", "Г00", 0],
    ["Д03г", "Е00", "Ж00", "З00", 0],
    [0, "И00", "К02г", "К00", 0],
    [0, 0, 0, 0, 0],
    ];
  
  
  
  
  
  
  
  
  
  // Добавляем обработчик событий на клик по кнопке
  buttonAbsolute.addEventListener('click', function() {
    // Инвертируем значение переменной showAnswers
    showAnswers = !showAnswers;
    
    // Сохраняем значение переменной showAnswers в локальное хранилище
    localStorage.setItem('showAnswers', showAnswers);
  
    // Сохраняем значение переменной heading.textContent в локальное хранилище
    localStorage.setItem('headingTextContent', heading.textContent);
    
    // Перезагружаем страницу
    location.reload();
  });
  
  
  
  
  
  
  
  
  
  const a = []; // ответы на вопросы.
  const b = []; // горизонтальные и вертикальные стрелки.
  const c = []; // нумерация.
  
  const foundWords = [];
  findWords(crossword, a);
  
  
  // добавляем нумерацию в массив "с".
  crossword.forEach(row => {
    row.forEach(col => {
      if (col !== 0 && col.length > 2 && col.slice(1, 3) !== "00") {
        c.push(col.slice(1, 3));
      }
    });
  });
  
  
  // добавляем стрелки в массив "b".
  crossword.forEach(row => {
    row.forEach(col => {
      let hasMatchingChars = false;
  
      for (let i = 0; i < col.length; i++) {
        if (col[i] === "г" || col[i] === "в") {
          hasMatchingChars = true;
          break;
        }
      }
  
      if (hasMatchingChars) {
        const unicode = col.includes("г") ? "\u2194" : (col.includes("в") ? "\u2195" : "");
        b.push(unicode);
      }
    });
  });
  
  
  
  
  
  
  console.log(b); // [ '&#8597;', '&#8598;' ]
  console.log(c); // выводим результат нумерации
  console.log(a); // выводим результат нумерации
  console.log(foundWords);
  
  
  
  // Глобальная переменная для хранения типа автоматической переброски
  let autoJumpType = "отключено";
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Создаем таблицу и задаем ей стиль
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  
  
  
  
  
  let match = "false";
  
  // Сравниваем значения и изменяем цвет фона ячейки в зависимости от правильности ввода
  function checkInput(input, firstChar, inputValue, match) {
    let isMatch = inputValue === firstChar;
    if (isMatch) {
      input.style.transition = "background-color 0.3s ease";
      input.style.backgroundColor = "#C0FFA5";
    } else if (inputValue === "") {
      input.style.transition = "background-color 0.3s ease";
      input.style.backgroundColor = "white";
    } else {
      input.style.transition = "background-color 0.3s ease";
      input.style.backgroundColor = "orange";
    }
    match = isMatch;
    return match;
  }
  
  
  
  
  // Проходим по всем строкам массива
  for (let i = 0; i < crossword.length; i++) {
    // Создаем новую строку таблицы
    const row = document.createElement("tr");
  
    // Проходим по всем ячейкам текущей строки
    for (let j = 0; j < crossword[i].length; j++) {
      // Создаем новую ячейку таблицы и задаем ей стиль
      const cell = document.createElement("td");
      cell.style.width = "40px";
      cell.style.height = "40px";
      cell.style.border = "1px solid black";
  
      // Если элемент массива равен нулю, то закрашиваем ячейку в серый цвет
      if (crossword[i][j] === 0) {
        cell.style.backgroundColor = "rgba(0, 0, 0, 0.432)";
        cell.style.border = "2px solid black";
      } else {
        // Иначе закрашиваем ячейку в белый цвет и добавляем поле для ввода
        cell.style.backgroundColor = "white";
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.style.top = "-10px";
        input.style.width = "91%";
        input.style.height = "93%";
        input.style.textAlign = "center";
  
        
  
  
  
  
  
  
        if (autoJumpType === "вертикально") {
          // Добавляем обработчик событий для автоматического перехода на следующий инпут при вводе буквы в текущем инпуте таблицы
          input.addEventListener("input", function(e) {
            const columnIndex = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
            const nextRow = e.target.parentNode.parentNode.nextElementSibling;
            if (nextRow) {
              const nextInput = nextRow.children[columnIndex]?.querySelector("input");
              if (nextInput) {
                nextInput.focus();
              }
            }
          });
        }
              
        if (autoJumpType === "горизонтально") {
          // Добавляем обработчик событий для автоматического перехода на следующий инпут при вводе буквы в текущем инпуте таблицы
          input.addEventListener("input", function(e) {
            const rowIndex = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
            const nextInput = e.target.parentNode.parentNode.children[rowIndex + 1]?.querySelector("input");
            if (nextInput) {
              nextInput.focus();
            }
          });
        }
        
        
  
        
  
       
        
  
        // Если элемент массива содержит более одного символа, то создаем span и добавляем его в ячейку таблицы
        if (crossword[i][j].length > 1) {
          const span = document.createElement("span");
          span.textContent = crossword[i][j].substring(1);
          cell.appendChild(span);
          input.value = localStorage.getItem(crossword[i][j]); // Получаем сохраненное значение из localStorage
        } else {
          input.value = localStorage.getItem(i + '-' + j); // Получаем сохраненное значение из localStorage
        }
        // Проверяем второй и третий символ каждого элемента массива и скрываем span при необходимости
        if (crossword[i][j].length > 1 && crossword[i][j].charAt(1) === "0" && crossword[i][j].charAt(2) === "0") {
          cell.querySelector("span").style.opacity = "0";
        }
        cell.appendChild(input);
  
        
  
        // Добавляем обработчик события на изменение значения в поле ввода
        input.addEventListener("input", function () {
          // Получаем значение инпута и первый символ соответствующего элемента массива
          const inputValue = input.value.toUpperCase();
          const firstChar = crossword[i][j].charAt(0).toUpperCase();
          if (crossword[i][j].length > 1) {
            localStorage.setItem(crossword[i][j], input.value); // Сохраняем значение в localStorage с ключом равным значению элемента массива
          } else {
            localStorage.setItem(i + '-' + 1, input.value); // Сохраняем значение в localStorage с ключом равным индексу элемента массива
          }
          checkInput(input, firstChar, inputValue);
  
  
  
  
  
          const inputFields = document.querySelectorAll('.input-field');
  
          
  
  // Проверяем, есть ли на элементе класс "focused"
  if (!input.classList.contains("focused")) {
    // При наведении на инпут - он плавно (за 0.3 сек) окрашивается в полупрозрачный лавандовый цвет
    input.style.transition = "background-color 0.3s ease-in-out";
    input.style.backgroundColor = "rgba(221, 160, 221, 0.3)";
  }
          
          
          checkInput(input, firstChar, inputValue, match);
      })
  
  
      
  
  
  // Добавляем обработчик события на наведение курсора на поле ввода
  input.addEventListener("mouseenter", function () {
    // Проверяем, есть ли на элементе класс "focused"
    if (!input.classList.contains("focused")) {
      input.style.transition = "background-color 0.3s ease-in-out";
      input.style.backgroundColor = "rgba(221, 160, 221, 0.3)";
    }
  
  });
  
  // Добавляем обработчик события на уход курсора с поля ввода
  input.addEventListener("mouseleave", function () {
    // Проверяем, есть ли на элементе класс "focused"
    if (!input.classList.contains("focused")) {
      input.style.transition = "background-color 0.3s ease-in-out";
      input.style.backgroundColor = "white";
    }
  
  });
  
  // Добавляем обработчик события на фокус поля ввода
  input.addEventListener("focus", function () {
    input.classList.add("focused");
    input.style.transition = "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
    input.style.backgroundColor = "white";
    input.style.boxShadow = "0 0 0 2px rgba(148, 0, 211, 0.7) inset";
  
  });
  
  // Добавляем обработчик события на потерю фокуса поля ввода
  input.addEventListener("blur", function () {
    input.classList.remove("focused");
    input.style.transition = "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
    input.style.backgroundColor = "white";
    input.style.boxShadow = "none";
  
  });
      }
  
      // Добавляем ячейку в текущую строку таблицы
      row.appendChild(cell);
    }
    table.appendChild(row);
  
    table.id = `table-${Date.now()}`;
  
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Создаем новый div элемент
  const controlPanel = document.createElement('div');
  
  // Устанавливаем id и class
  controlPanel.id = 'control-panel';
  controlPanel.className = 'panel';
  
  // Устанавливаем текст в InnerHtml
  controlPanel.innerHTML = 'Панель управления';
  
  // Добавляем div в боди документа
  document.body.appendChild(controlPanel);
  
  
  // Создаем новый div элемент "Суб панель сводки"
  const summarySubPanel = document.createElement('div');
  
  // Устанавливаем id и class
  summarySubPanel.id = 'summary-subpanel';
  summarySubPanel.className = 'subpanel';
  
  let TableWidth = crossword[0].length; // Получаем количество ячеек в строке массива.
  let TableHeight = crossword.length; // Получаем количество строк в массиве.
  
  // Добавляем subpanel как дочерний элемент в controlPanel
  controlPanel.appendChild(summarySubPanel);
  
  // Для скрытия/отображения панели
  if (showAnswers) {
    controlPanel.style.display = 'block';
  } else {
    controlPanel.style.display = 'none';
  }
  
  
  
  let ValidLettersEntered = 0; // Счетчик правильно введенных букв.
  
  // Получаем все инпуты в таблице
  const inputsGet = table.getElementsByTagName('input');
  
  // Получаем количество инпутов
  const totalInputs = inputsGet.length;
  
  // Инициализируем счетчик заполненных инпутов
  let filledInputs = 0;
  
  
  
  
  // Получаем все ячейки таблицы
  const cellsGet = table.getElementsByTagName('td');
  
  
  
  // Функция для обновления значения заполненных инпутов и счетчика правильно введенных букв
  function updateFilledInputs() {
    filledInputs = 0;
    for (let i = 0; i < totalInputs; i++) {
      if (inputsGet[i].value !== '') {
        filledInputs++;
      }
    }
    
  
  localStorage.getItem('liCount');
    
  
    
    
    
  
    // Вычисляем процент заполненных инпутов от общего количества инпутов
    const progressPercentage = Math.round((filledInputs / totalInputs) * 100);
  
    // Присваиваем полученное значение переменной Progress
    const Progress = progressPercentage + '%';
  
    // Обновляем текст в InnerHtml, включая значение прогресса
    summarySubPanel.innerHTML = 'Общая сводка:</br>Кроссворд (Ш х В): '+ TableWidth + ' х ' + TableHeight + '</br>Всего букв: ' + TotalLetters + '</br>Заполнено букв: ' + 
                                filledInputs + '</br>Прогресс: ' + Progress + '</br>Ответов создано: ' + liCount;
  }
  
  
  
  // Присваиваем количество инпутов переменной "Всего букв"
  const TotalLetters = totalInputs;
  
  // Вызываем функцию обновления заполненных инпутов
  updateFilledInputs();
  
  // Присваиваем количество заполненных инпутов переменной "Заполнено букв"
  let FilledWithLetters = filledInputs;
  
  
  // Вычисляем процент заполненных инпутов от общего количества инпутов
  const progressPercentage = Math.round((FilledWithLetters / TotalLetters) * 100);
  
  // Присваиваем полученное значение переменной Progress
  const Progress = progressPercentage + '%';
  
  FilledWithLetters = filledInputs;
  
  localStorage.getItem('liCount');
  
  // Устанавливаем текст в InnerHtml
  summarySubPanel.innerHTML = 'Общая сводка:</br>Кроссворд (Ш х В): '+ TableWidth + ' х ' + TableHeight + '</br>Всего букв: ' + TotalLetters + '</br>Заполнено букв: ' + 
                               FilledWithLetters + '</br>Прогресс: ' + Progress + '</br>Ответов создано: ' + liCount;
  
  
  // Добавляем обработчик событий "input" на каждый инпут 
  
  
  
  for (let i = 0; i < totalInputs; i++) {
    inputsGet[i].addEventListener('input', function() {
      updateFilledInputs();
    });
  }
  
  
  
  // Создание div с классом и айди CellPopup
  const cellPopup = document.createElement("div");
  cellPopup.setAttribute("class", "CellPopup");
  cellPopup.setAttribute("id", "CellPopup");
  
  // Скрытие элемента со страницы
  cellPopup.style.display = "none";
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  let cellValue = undefined;
  
  
  // Переменная для таймера
  let timer;
  
  
    let currentCellValue = '';
    let fourthChar = '';
    let markus = autoJumpType;
  
    // Проверка глобальной переменной showAnswers
    if (showAnswers) {
      // Отображение элемента при наведении на ячейку таблицы или ее инпут
      document.addEventListener("mousemove", function (event) {
        const target = event.target.closest("td, input");
        if (!target) {
          clearTimeout(timer);
          cellPopup.style.display = "none";
          return;
        }
  
        const rect = target.getBoundingClientRect();
        const [mouseX, mouseY] = [event.clientX, event.clientY];
  
        if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
          const [rowIndex, cellIndex] = [target.parentNode.rowIndex, target.cellIndex];
          const cellValue = crossword[rowIndex][cellIndex];
  
          // Определение типа элемента (ячейка таблицы или инпут)
          let isInput = false;
          if (target.tagName.toLowerCase() === "input" && target.classList.contains("Crossword__input--filled")) {
            isInput = true;
          }
  
          // Получение 4-го символа ячейки
          fourthChar = cellValue[3];
  
          // Определение направления автоматического перехода
          if (fourthChar === "г") {
            markus = "горизонтально";
          } else if (fourthChar === "в") {
            markus = "вертикально";
          }
  
          console.log(markus);
  
  
  
          // Проверка на совпадение введенного символа с первым символом элемента массива
          let isCorrect = "";
          if (isInput) {
            const inputValue = target.value.trim();
            isCorrect = checkInput(cellValue[0], inputValue) ? "да" : "";
          }
  
          // Отображение элемента со значениями из массива crossword
          cellPopup.innerHTML = `Значение ячейки: ${cellValue} <br> Строка: ${rowIndex + 1} <br> Столбец: ${cellIndex + 1}`;
  
          // Задержка отображения элемента
          clearTimeout(timer);
          timer = setTimeout(() => {
            cellPopup.style.display = "block";
            cellPopup.style.top = `${event.pageY - 70}px`;
            cellPopup.style.left = `${event.pageX - 190}px`;
          }, 100);
        } else {
          clearTimeout(timer);
          cellPopup.style.display = "none";
        }
      });
    } else {
      // Скрытие элемента со страницы
      cellPopup.style.display = "none";
    }
  
  
  
  
  
  
  
  
  
  
  
  // Добавление элемента на страницу
  document.body.appendChild(cellPopup);
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Создаем контейнер для заголовка
  
  const namedHead = document.createElement('div');
  namedHead.id = 'named-head';
  namedHead.className = 'named-head';
  document.body.appendChild(namedHead);
  
  // Создаем кнопку назад
  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.className = 'back-button';
  backButton.innerHTML = `<a href="${back_page}"> &#9664;</a>`;
  
  
  
  namedHead.appendChild(backButton);
  
  // &#9658;   - треугольник вправо
  
  // Создаем кнопку
  const buttonHolova = document.createElement('button');
  
  // Добавляем текст на кнопку
  buttonHolova .textContent = 'Человек и вечность. Выпуск ' + GivenDate;
  
  // Добавляем класс на кнопку
  buttonHolova .classList.add('button-class-header');
  
  // Добавляем кнопку в namedHead
  namedHead.appendChild(buttonHolova );
  
  
  
  // Создаем кнопку назад
  const ForwardButton = document.createElement('button');
  ForwardButton.id = 'back-button';
  ForwardButton.className = 'forward-button';
  ForwardButton.innerHTML = `<a href="${next_page}"> &#9658;</a>`;
  
  namedHead.appendChild(ForwardButton);
  
  
  
  
  
  
  
  
  
  
  
  // Добавляем таблицу на страницу
  document.body.appendChild(table);
  
  // Получаем все инпуты на странице
  const inputs = document.querySelectorAll('input');
  
  // Добавляем обработчики событий для каждого инпута
  inputs.forEach(input => {
    // Обработчик события наведения на инпут
    input.addEventListener('mouseover', () => {
      input.style.transition = 'background-color 0.3s ease-in-out';
      input.style.backgroundColor = 'rgba(119, 38, 240, 0.15)';
      
    });
  
    // Обработчик события покидания курсора с инпута
    input.addEventListener('mouseout', () => {
      input.style.backgroundColor = 'transparent';
  
    });
  
    // Добавляем обработчик события для подсветки рамки при фокусе на инпуте
  input.addEventListener("focus", function () {
    input.style.outline = "1px solid #8A2BE2";
    input.style.borderRadius = "5px";
    input.style.boxShadow = "inset 0 0 10px 2px rgba(153, 50, 204, 0.7)";
    input.style.transition = "all 0.9s ease";
  
  });
  
  input.addEventListener("blur", function () {
    input.style.outline = "";
    input.style.borderRadius = "";
    input.style.boxShadow = "none";
  });
  
  });
  
  // Удаляем 3 символ из всех span.
  const spans = document.querySelectorAll("td span");
  spans.forEach(span => {
    if (span.textContent.length > 2) {
      span.textContent = span.textContent.substring(0, 2);
    }
  });
  
  
  // Создаем новый div элемент
  const actionBar = document.createElement('div');
  
  // Устанавливаем класс и id для созданного элемента
  actionBar.classList.add('ActionBarWithTable');
  actionBar.id = 'myActionBarWithTable';
  
  // Находим элемент body и добавляем созданный div внутрь
  const body = document.querySelector('body');
  document.body.appendChild(actionBar);
  
  
  
  // Создаем новую кнопку уменьшения таблицы
  const ReduceTableButton = document.createElement('button');
  
  // Устанавливаем класс и id для кнопки
  ReduceTableButton.classList.add('round-btn');
  ReduceTableButton.id = 'ReduceTableButton';
  
  // Добавляем символ "+" внутрь кнопки
  ReduceTableButton.textContent = '-';
  
  // Находим элемент actionBar и добавляем созданную кнопку внутрь
  
  actionBar.appendChild(ReduceTableButton);
  
  
  
  
  
  // Создаем новую кнопку увеличения таблицы.
  const enlargeButton = document.createElement('button');
  
  // Устанавливаем класс и id для кнопки
  enlargeButton.classList.add('round-btn2');
  enlargeButton.id = 'EnlargeTableButton';
  
  // Добавляем символ "+" внутрь кнопки
  enlargeButton.textContent = '+';
  
  // Находим элемент actionBar и добавляем созданную кнопку внутрь
  
  actionBar.appendChild(enlargeButton);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Получаем родительский элемент, куда будем добавлять созданный div
  const parent = document.getElementById("parent-element");
  
  // Создаем элементы
  const questionsDiv = document.createElement("div");
  questionsDiv.className = "questions";
  
  // Получаем сохраненное значение heading.textContent из локального хранилища
  let savedHeadingTextContent = localStorage.getItem('headingTextContent');
  
  // Если сохраненное значение не существует, устанавливаем значение по умолчанию
  if (!savedHeadingTextContent) {
    savedHeadingTextContent = "Вопросы:";
  }
  
  const heading = document.createElement("h2");
  heading.textContent = savedHeadingTextContent;
  questionsDiv.appendChild(heading);
  
  const orderedList = document.createElement("ol");
  
  
  
  
  
  
  
  
  
  let listItems = [];
  
  
  // Обновляем текст кнопки в соответствии со значением showAnswers
  if (showAnswers) {
    heading.textContent = "Ответы и вопросы:";
  } else {
    heading.textContent = "Вопросы:";
  }
  
  
  
  
  
  
  // Создаем li элементы с текстом из массивов
  for (let i = 0; i < a.length; i++) {
    const questionAndAnswer = questionsAndAnswers.find((obj) => obj.answer === a[i]);
    const listItem = document.createElement("li");
    const p = document.createElement("p");
    
    p.innerHTML = `${c[i]}. ${b[i]}`;
    if (showAnswers && a[i]) {
      p.innerHTML += ` - <strong style="color: #FFF192;">${a[i]}&nbsp;&nbsp;</strong>`;
    }
    if (questionAndAnswer && questionAndAnswer.question) {
      p.innerHTML += ` ${questionAndAnswer.question}`;
    }
    
    p.classList.add("pointing-to-a-line");
    listItem.appendChild(p);
    
    listItems.push(listItem);
  }
  
  
  
  
  
  // Сортируем li элементы по значению из массива "c"
  listItems.sort((a, b) => {
    const aNum = parseInt(a.querySelector('p').innerHTML.split(".")[0]);
    const bNum = parseInt(b.querySelector('p').innerHTML.split(".")[0]);
    return aNum - bNum;
  });
  
  // Добавляем отсортированные li элементы обратно в элемент "ol"
  listItems.forEach((listItem) => {
    orderedList.appendChild(listItem);
  });
  
  
  
  
  
  
  questionsDiv.appendChild(orderedList);
  
  
  
  
  
  
  
  if (localStorage.getItem('liCount')) {
    localStorage.removeItem('liCount');
  }
  
  
  liCount = localStorage.getItem('liCount');
  
  if (!liCount) {
    liCount = 0;
    listItems.forEach((listItem) => {
      liCount += listItem.querySelectorAll('p').length;
    });
    localStorage.setItem('liCount', liCount);
  }
  
  
  
  
  // Добавляем созданный div на страницу
  document.body.appendChild(questionsDiv);
  
  
  
  // Создаем кнопку
  const clearStorageButton = document.createElement("button");
  clearStorageButton.textContent = "Начать заново";
  clearStorageButton.id = "clear-storage-button";
  clearStorageButton.classList.add("my-button-class");
  
  
  
  
  
  
  
  
  
  
  // Создаем кнопку и задаем ей id и class
  const buttonFinish = document.createElement("button");
  buttonFinish.id = "finish-button";
  buttonFinish.classList.add("my-button-class2");
  buttonFinish.textContent = "Завершить";
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Создаем элемент кнопки
  const buttonHelp = document.createElement('button');
  
  // Задаем id и class для кнопки
  buttonHelp.id = 'question-btn';
  buttonHelp.classList.add('round-btn3');
  
  // Устанавливаем текстовый контент вопросительного знака
  buttonHelp.textContent = '?';
  
  
  // Создаем новый элемент div
  const newDivAction = document.createElement('div');
  
  // Устанавливаем атрибуты id и class для созданного элемента
  newDivAction.id = 'action-panel';
  newDivAction.classList.add('panel');
  
  // Добавляем созданный элемент в тело документа
  document.body.appendChild(newDivAction);
  
  // Добавляем кнопку в конец элемента body
  newDivAction.appendChild(clearStorageButton);
  
  // Добавляем созданную кнопку на страницу
  newDivAction.appendChild(buttonFinish);
  
  
  
  // Добавляем кнопку в родительский элемент
  newDivAction.appendChild(buttonHelp);
  
  // Получаем кнопку
  const button = document.getElementById("clear-storage-button");
  
  
  
  
  // Находим кнопку и добавляем обработчик события для открытия всплывающего окна
  const questionBtn = document.getElementById('question-btn');
  questionBtn.addEventListener('click', openPopup);
  
  function openPopup() {
    const popupDiv = document.createElement("div"); // создаем новый элемент div
    popupDiv.className = "popup"; // задаем класс "popup" для элемента div
    popupDiv.id = "myPopup"; // задаем уникальный идентификатор "myPopup" для элемента div
    popupDiv.innerHTML = "<b>Справочная информация:</b><br> " +
                       "<strong style='color: rgb(2, 168, 99);'>Минус и плюс </strong> " +
                       "- изменяют размер таблицы.<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>Начать заново</strong> " +
                       "- удаляет все введенные буквы.<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>Замок </strong> " +
                       "- позволяет сделать ячейки невидимыми для посторонних глаз, для разблокировки нужно снова нажать на кнопку.<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>Завершить</strong> " +
                       "- показывает правильные ответы.<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>?</strong> " +
                       "- выводит справку.<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>Панель вопросов</strong> " +
                       "- отображает номер вопроса, вертикальные ответы (<b>&#8597;</b>), так и горизонтальные (<b>&#8596;</b>).<br>" +
                       "<strong style='color: rgb(2, 168, 99);'>Номер сборки</strong> " +
                       "- демонстрирует историю изменений кроссворда.<br>"; // задаем HTML-контент для элемента div
    document.body.appendChild(popupDiv); // добавляем элемент div в конец тега body
  
    // Показываем всплывающее окно
    popupDiv.style.display = "block";
    document.querySelector('.questions').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "questions"
    document.querySelector('.panel').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "panel"
    document.querySelector('.my-class-btn-general').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "my-class-btn-general"
    document.querySelector('.my-button-class').style.filter = 'blur(5px)';
    document.querySelector('.my-button-class2').style.filter = 'blur(5px)';
    document.querySelector('table').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "table"
    document.querySelector('.CellPopup').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "CellPopup"
    document.querySelector('.background-class').style.filter = 'blur(5px)'; // устанавливаем фильтр "blur" для элемента с классом "background-class"
    document.querySelector('#buildNumberButton').style.filter = 'blur(5px)';
    document.querySelector('.round-btn').style.filter = 'blur(5px)';
    document.querySelector('.round-btn2').style.filter = 'blur(5px)';
    document.querySelector('.round-btn3').style.filter = 'blur(5px)';
    document.querySelector('.ActionBarWithTable').style.filter = 'blur(5px)';
    document.querySelector('.named-head').style.filter = 'blur(5px)';
    document.querySelector('.back-button').style.filter = 'blur(5px)';
    document.querySelector('.forward-button').style.filter = 'blur(5px)';
    
    
    
  
    // Добавляем обработчик события для закрытия всплывающего окна
    popupDiv.addEventListener('click', closePopup);
  
    function closePopup() {
      popupDiv.style.display = "none"; // скрываем всплывающее окно
      popupDiv.removeEventListener('click', closePopup); // удаляем обработчик события для закрытия всплывающего окна
      document.body.removeChild(popupDiv); // удаляем элемент div из тега body
      document.querySelector('.questions').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "questions"
      document.querySelector('.panel').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "panel"
      document.querySelector('.my-button-class').style.filter = 'none';
      document.querySelector('.my-button-class2').style.filter = 'none';
      document.querySelector('.my-class-btn-general').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "my-class-btn-general"
      document.querySelector('table').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "table"
      document.querySelector('.CellPopup').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "CellPopup"
      document.querySelector('.background-class').style.filter = 'none'; // удаляем фильтр "blur" для элемента с классом "background-class"
      document.querySelector('#buildNumberButton').style.filter = 'none';
      document.querySelector('.round-btn').style.filter = 'none';
      document.querySelector('.round-btn2').style.filter = 'none';
      document.querySelector('.round-btn3').style.filter = 'none';
      document.querySelector('.ActionBarWithTable').style.filter = 'none';
      document.querySelector('.named-head').style.filter = 'none';
      document.querySelector('.back-button').style.filter = 'none';
      document.querySelector('.forward-button').style.filter = 'none';
    }
  }
  
  
  
  // Создаем кнопку
  const buildButton = document.createElement('button');
  
  // Устанавливаем ей id и класс
  buildButton.id = 'buildNumberButton';
  buildButton.className = 'buildNumberButtonClass';
  
  // Задаем текст внутри кнопки
  buildButton.innerHTML = 'v. 2.2.0';
  
  // Добавляем кнопку на страницу
  document.body.appendChild(buildButton);
  
  
  // Создаем див
  const historyDiv = document.createElement('div');
  
  // Устанавливаем ему id и класс
  historyDiv.id = 'historyOfChanges';
  historyDiv.className = 'historyOfChangesClass';
  
  // Задаем текст внутри дива
  historyDiv.innerHTML = '<strong>История изменений:</strong> <br>' +
                         '<strong style="color: rgb(2, 168, 99);">2.2.0</strong> Добавлен встроенный редактор генерации и модификации массива, это ускорит создание кроссворда.</br>' +
                         '<strong style="color: rgb(2, 168, 99);">2.1.0</strong> Исправлены ошибки с сохранениями. Добавлены: Кнопка для скрытия ячеек, кнопки для перехода между страницами.</br>' +
                         '<strong style="color: rgb(2, 168, 99);">2.0.3</strong> Небольшое обновление. Добавлены: Кнопки для масштабирования таблицы.</br>' +
                         '<strong style="color: rgb(2, 168, 99);">2.0.1</strong> Полностью переписан код. Добавлены: Автопроверка при вводе на правильный символ, Инженерный и Пользовательский режим.' +
                         ' При нажатии на кнопку "Завершить" результат сразу показывается на сайте. Переработан дизайн страницы. Продолжительность создания кроссворда' +
                         ' сокращена с 2-3 часов до 10-30 минут, благодаря автоматизации. </br>' +
                         '<strong style="color: rgb(2, 168, 99);">0.9.9</strong> Расширенная версия. Добавлены: Кнопка со справкой.</br>' +
                         '<strong style="color: rgb(2, 168, 99);">0.1.0</strong> Базовая версия. Добавлены: Дата выпуска кроссворда, Поля для заполнения,' +
                         ' Список вопросов с обозначением направления ответа, Автосохранение данных, Кнопка сброса сохранений, Кнопка, показывающая правильные ответы.';
  
  
  
  
  
  
  
  
  
  
  
  function addHistoryDiv() {
    document.body.appendChild(historyDiv);
    applyBlurFilter();
  }
  
  function removeHistoryDiv() {
    document.body.removeChild(historyDiv);
    removeBlurFilter();
  }
  
  function applyBlurFilter() {
    document.querySelector('.questions').style.filter = 'blur(5px)';
    document.querySelector('.panel').style.filter = 'blur(5px)';
    document.querySelector('.my-class-btn-general').style.filter = 'blur(5px)';
    document.querySelector('.my-button-class').style.filter = 'blur(5px)';
    document.querySelector('.my-button-class2').style.filter = 'blur(5px)';
    document.querySelector('.panel').style.filter = 'blur(5px)';
    document.querySelector('table').style.filter = 'blur(5px)';
    document.querySelector('.CellPopup').style.filter = 'blur(5px)';
    document.querySelector('.background-class').style.filter = 'blur(5px)';
    document.querySelector('.round-btn').style.filter = 'blur(5px)';
    document.querySelector('#buildNumberButton').style.filter = 'blur(5px)';
    document.querySelector('.round-btn2').style.filter = 'blur(5px)';
    document.querySelector('.round-btn3').style.filter = 'blur(5px)';
    document.querySelector('.ActionBarWithTable').style.filter = 'blur(5px)';
    document.querySelector('.named-head').style.filter = 'blur(5px)';
    document.querySelector('.back-button').style.filter = 'blur(5px)';
    document.querySelector('.forward-button').style.filter = 'blur(5px)';
    
  }
  
  function removeBlurFilter() {
    document.querySelector('.questions').style.filter = 'none';
    document.querySelector('.panel').style.filter = 'none';
    document.querySelector('.my-class-btn-general').style.filter = 'none';
    document.querySelector('.my-button-class').style.filter = 'none';
    document.querySelector('.my-button-class2').style.filter = 'none';
    document.querySelector('.panel').style.filter = 'none';
    document.querySelector('table').style.filter = 'none';
    document.querySelector('.CellPopup').style.filter = 'none';
    document.querySelector('.background-class').style.filter = 'none';
    document.querySelector('.round-btn').style.filter = 'none';
    document.querySelector('#buildNumberButton').style.filter = 'none';
    document.querySelector('.round-btn2').style.filter = 'none';
    document.querySelector('.round-btn3').style.filter = 'none';
    document.querySelector('.ActionBarWithTable').style.filter = 'none';
    document.querySelector('.named-head').style.filter = 'none';
    document.querySelector('.back-button').style.filter = 'none';
    document.querySelector('.forward-button').style.filter = 'none';
  }
  
  buildButton.addEventListener('click', addHistoryDiv);
  historyDiv.addEventListener('click', removeHistoryDiv);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  button.addEventListener("click", function() {
    // Сохраняем значения нужных переменных в отдельный объект
    const savedValues = {
      showAnswers: showAnswers,
      ShowAdvancedMode: ShowAdvancedMode
    };
    
    // Удаляем все элементы из локального хранилища, кроме нужных переменных
    Object.keys(localStorage).forEach(key => {
      if (!Object.keys(savedValues).includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    // Сохраняем нужные переменные обратно в локальное хранилище
    Object.entries(savedValues).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    
    // Плавное перемещение пользователя вверх страницы
    const scrollDuration = 360; // Время плавного перемещения в миллисекундах
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    let scrollInterval = setInterval(function(){
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      }
      else {
        clearInterval(scrollInterval);
        // Перезагрузка страницы через 3 секунды
        setTimeout(function() {
          location.reload();
        }, 120);
      }
    }, 15);
    
  });
  
  
  
  
  
  // Получаем кнопку
  const completeButton = document.getElementById("finish-button");
  
  // Добавляем обработчик события click
  completeButton.addEventListener("click", function() {
    // Вызываем функцию заполнения кроссворда корректными буквами, а также закрашиваем их, если ранее введенные буквы были верны или не верны.
    fillCrossword();
  });
  
  
  
  
  
  
  namedHead.style.marginTop = "1.5%"
  
  let MarginTopBufferActionBar; // Эта переменная поможет с адаптивным перемещением панели действий и блока вопросов при увеличении и уменьшении размера таблицы.
  let MarginBottomBuffer;
  
  const mediaQuery = window.matchMedia("(orientation: landscape)");
  
  if (mediaQuery.matches) {
    switch (crossword.length) {
      case 15:
        MarginTopBufferActionBar = "0.7%";
        MarginBottomBuffer = "2%";
        break;
      case 16:
        MarginTopBufferActionBar = "0.7%";
        MarginBottomBuffer = "2%";
        break;
      case 17:
        MarginTopBufferActionBar = "0.8%";
        MarginBottomBuffer = "2%";
        break;
      case 18:
        MarginTopBufferActionBar = "0.9%";
        MarginBottomBuffer = "2%";
        break;
      case 19:
        MarginTopBufferActionBar = "1.4%";
        MarginBottomBuffer = "2%";
        break;
      case 30:
        MarginTopBufferActionBar = "3%";
        break;
      default:
        MarginTopBufferActionBar = "0%";
    }
  } else {
    switch (crossword.length) {
      case 15:
        MarginTopBufferActionBar = "5.2%";
        MarginBottomBuffer = "4.5%";
        break;
      case 18:
        MarginTopBufferActionBar = "5.1%";
        MarginBottomBuffer = "5%";
        break;
      case 19:
        MarginTopBufferActionBar = "5.1%";
        MarginBottomBuffer = "6%";
        break;
      case 30:
        MarginTopBufferActionBar = "4%";
        break;
      default:
        MarginTopBufferActionBar = "0%";
    }
  }
  
  
  
  
  
  
  let isEnlarged; // Переменная отвечающая за значение увеличена таблица или нет.
  
  
  
  ReduceTableButton.addEventListener("click", () => {
    if (isEnlarged) {
      table.style.transition = "transform 0.5s ease";
      table.style.transform = "scale(1, 1)";
      table.style.marginTop = "0%";
      table.style.marginBottom = "1.5%";
      isEnlarged = false;
      ReduceTableButton.disabled = true;
      enlargeButton.disabled = false;
      questionsDiv.style.transition = "transform 0.5s ease";
      questionsDiv.style.transform = "translate(0, 0)";
      actionBar.style.marginTop = "0.8%";
      actionBar.style.transition = "transform 0.5s ease";
      actionBar.style.transform = "translate(0, 0)";
      namedHead.style.marginBottom = "1.8%";
    }
  });
  
  enlargeButton.addEventListener("click", () => {
    if (!isEnlarged) {
      table.style.transition = "transform 0.5s ease";
      table.style.transform = "scale(1.15, 1.15)";
      table.style.marginTop = "2.5%";
      table.style.marginBottom = "4%";
      isEnlarged = true;
      enlargeButton.disabled = true;
      ReduceTableButton.disabled = false;
      questionsDiv.style.transition = "transform 0.5s ease";
      questionsDiv.style.transform = "translate(0, -10px)";
      actionBar.style.marginTop = MarginTopBufferActionBar;
      actionBar.style.transition = "transform 0.5s ease";
      actionBar.style.transform = "translate(0, -10px)";
      namedHead.style.marginBottom = MarginBottomBuffer;
    }
  });
  
  
  const TableHider = document.createElement("button");
  TableHider.id = "TableHider";
  TableHider.className = "round-btn4";
  TableHider.innerHTML = "&#128275;"; // Код символа Unicode
  
  // &#128272; - символ закрытого замка.
  
  
  actionBar.appendChild(TableHider);
  
  
  
  // Сначала получаем элементы, с которыми будем работать
  
  const tableInputs = table.querySelectorAll('input');
  const tableHider = document.querySelector('#TableHider');
  
  // Создаем переменную, отвечающую за текущее состояние таблицы
  let tableLocked = false;
  
  // Функция для блокировки/разблокировки таблицы
  function toggleTableLock() {
    // Если таблица заблокирована, то разблокируем ее и снимаем размытие с инпутов
    if (tableLocked) {
      tableInputs.forEach(input => {
        input.disabled = false;
        input.style.filter = 'none';
        input.style.backgroundColor = '#ffffff'; // Возвращаем белый цвет фона
      });
      tableHider.innerHTML = '&#128275;'; // Меняем значок на кнопке
    } else { // Иначе блокируем таблицу и применяем размытие и серый цвет фона к инпутам
      tableInputs.forEach(input => {
        input.disabled = true;
        input.style.filter = 'blur(5px)';
        input.style.backgroundColor = '#000'; // Закрашиваем серым цветом фон
      });
      tableHider.innerHTML = '&#128272;'; // Меняем значок на кнопке
    }
  
    // Инвертируем значение переменной, отвечающей за состояние таблицы
    tableLocked = !tableLocked;
  }
  
  
  // Добавляем обработчик события для кнопки
  tableHider.addEventListener('click', () => {
    // Запускаем функцию toggleTableLock() с плавной анимацией
    table.style.transition = 'all 2s ease';
    toggleTableLock();
  });
  
  
  
  
  // Функция выдает все первые символы из всех элементов массива, сопоставляет их с символами введенные в инпуты и закрашивает по корректности.
  function fillCrossword() {
    const table = document.querySelector("table");
    
    for (let i = 0; i < crossword.length; i++) {
      for (let j = 0; j < crossword[i].length; j++) {
        const cellValue = crossword[i][j];
        if (cellValue !== 0 && typeof cellValue === "string" && isNaN(parseInt(cellValue[0]))) {
          const cellElement = table.rows[i].cells[j].querySelector("input");
          if (cellElement.value === cellValue[0]) {
            cellElement.style.backgroundColor = "#f263ff8c"; // зеленый цвет, если символы совпадают
          } else {
            cellElement.style.backgroundColor = "#f263ff8c"; // оранжевый цвет, если символы не совпадают
          }
          cellElement.value = cellValue[0];
        }
      }
    }
    
    // Плавное перемещение пользователя вверх страницы
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function findCrosswordWords(crossword) {
    let words = [];
    for (let i = 0; i < crossword.length; i++) {
      for (let j = 0; j < crossword[i].length; j++) {
        let letter = crossword[i][j][0];
        let direction = crossword[i][j][3];
        if (letter !== 0 && (direction === "в" || direction === "г")) {
          let word = letter;
          let r = i;
          let c = j;
          if (direction === "в") { // vertical
            while (r < crossword.length - 1 && crossword[r + 1][c][0] !== 0) {
              r++;
              word += crossword[r][c][0];
            }
          } else { // horizontal
            while (c < crossword[i].length - 1 && crossword[r][c + 1][0] !== 0) {
              c++;
              word += crossword[r][c][0];
            }
          }
          if (word.length > 1) words.push(word);
        }
      }
    }
    return words;
  }
  
  
  findCrosswordWords();
  
  
  
  
  
  
  function findWords(crossword, foundWords) {
    for (let i = 0; i < crossword.length; i++) {
      for (let j = 0; j < crossword[i].length; j++) {
        const item = crossword[i][j];
        if (item && typeof item === "string" && item.length >= 4 && item[0] !== "0") {
          if (item[3] === "в") {
            let word = "";
            for (let k = i; k < crossword.length; k++) {
              const nextItem = crossword[k][j];
              if (nextItem && typeof nextItem === "string" && nextItem.length >= 1 && nextItem[0] !== "0") {
                word += nextItem[0];
              } else {
                break;
              }
            }
            if (word.length > 1) {
              foundWords.push(word);
            }
          } else if (item[3] === "г") {
            let word = "";
            for (let k = j; k < crossword[i].length; k++) {
              const nextItem = crossword[i][k];
              if (nextItem && typeof nextItem === "string" && nextItem.length >= 1 && nextItem[0] !== "0") {
                word += nextItem[0];
              } else {
                break;
              }
            }
            if (word.length > 1) {
              foundWords.push(word);
            }
          }
        }
      }
    }
  }

















