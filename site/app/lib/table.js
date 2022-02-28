function makeTable(title, headers, data, options) {
  const outputData = [];
  for (let item of data) {
    const itemData = [];

    for (let header of headers) {
      const [headerItem] = header.split(">").map((x) => x.trim());

      itemData.push(item[headerItem]);
    }

    outputData.push(itemData);
  }

  const outputHeaders = headers.map((header) => {
    const [headerItem, headerName] = header.split(">").map((x) => x.trim());
    return headerName ?? headerItem;
  });

  return {
    title,
    headers: outputHeaders,
    data: outputData,
    options: {
      ...(options ?? {}),
    },
  };
}

function table(data) {
  let html = !!data.title ? [`<h1>${data.title}</h1>`] : [];

  if (!!data.options.selectMonth) {
    html.push(`
    <form method="get">
      <div class="row">
        <div class="col-md-4">
          <label for="mo" class="form-label">Filter by month</label>
          <select class="form-select" name="mo" id="mo">
            <option value="null">None</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <br/>
          <button type="submit" class="btn btn-primary">Apply filter</button>
        </div>
      </div>
    </form>

    <br/>
    `);
  }

  html.push(
    !!data.title
      ? [
          `<div class="table-responsive"><table id="${data.title.toLowerCase()}" class="table align-middle">`,
        ]
      : [`<div class="table-responsive"><table class="table align-middle">`]
  );

  const hasActionsCol = !!data.options.update || !!data.options.delete;

  // render headers
  html.push("<thead>");
  html.push("<tr>");

  for (let header of data.headers) {
    html.push(`<th scope="col">${header}</th>`);
  }

  if (hasActionsCol) {
    html.push(`<th scope="col" style="width: 10%">Actions</th>`);

    if (data.options.insert) {
      html.push(
        `<th scope="col" style="width: 3%"><a class="btn btn-sm btn-primary" href="${data.options.insert}"><i class="fas fa-plus"></i></a></th>`
      );
    }
  }

  html.push("</tr>");
  html.push("</thead>");

  // render data
  html.push("<tbody>");
  for (let row of data.data) {
    html.push("<tr>");

    for (let cell of row) {
      html.push(`<td>${cell}</td>`);
    }

    if (hasActionsCol) {
      html.push(`<td style="width: 10%">`);
      html.push(`<div class="float-right btn-group" role="group">`);

      if (!!data.options.update) {
        html.push(
          `<a type="button" class="btn btn-primary" href="${data.options.update}${row[0]}"><i class="far fa-edit"></i></a>`
        );
      }

      if (!!data.options.delete) {
        html.push(
          `<button type="button" class="btn btn-danger" onclick="doAction('${
            data.options.delete
          }${row[0]}', 'DELETE', '${
            data.options.returnTo ?? "/admin"
          }')"><i class="far fa-trash-alt"></i></button>`
        );
      }

      html.push("</div>");
      html.push("</td>");
    }

    html.push("</tr>");
  }
  html.push("</tbody>");

  html.push("</table></div>");

  return html.join("\n");
}

module.exports = {
  makeTable,
  table,
};
