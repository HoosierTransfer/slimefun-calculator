<style>
    .title {
        text-align: center;
        font-size: 600%;
    }

    .title-container {
        display: flex;
        width: 100%;
        height: min-content;
        justify-content: center;
        margin-top: 5vh;
        margin-bottom: 5vh;
    }

    .content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

.item-select {
    background-color: white;
    border: none;
    border-radius: 5px 5px 5px 5px;
    padding: 12px 15px;
    /* width: 10%; */
    width: 300px;
    margin: 0;
    /* padding-bottom: 10px; */
}

.item-select:active, .item-select:focus {
  outline: none;
}

.item-list {
  visibility: hidden;
  background-color: white;
  height: 0px;
  margin: auto;
  /* margin-top: 0; */
  padding: 0px 15px;
  z-index: 100;
  border-radius: 0px 0px 5px 5px;
  width: 300px;
  transition: all 0.4s ease-in-out, background 1ms;
  overflow-y: scroll;
  overflow-x: hidden;
}

.list-item {
  padding-left: 5px;
  color: black;
  height: 50px;
  width: 285px;
  z-index: 1000;
  border-radius: 5px 5px 5px 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: white;
  margin-bottom: 20px;
  line-height: 50px;
}
.list-item:hover {
  background-color: #E5E9F0;
}

</style>
<script>
  import * as recipiesArray from "$lib/parsedArray.json";
  import * as recipies from "$lib/parsed.json";

  console.log(recipies);
  let filteredItems = recipiesArray.default;
  let inputValue = '';
  let dropdownStyle = "";
  let searchBarStyle = '';

  function fil(value) {
    return inputValue.toLowerCase().includes(item.itemName.toLowerCase());
}

  let isDropdownUp = true;

  function dropdown() {
    if (isDropdownUp) {
      dropdownStyle = "height: 200px; padding: 12px 15px; visibility: visible; display: 100%;";
      searchBarStyle = "border-radius: 5px 5px 0 0;";
      isDropdownUp = false;
    } else {
      dropdownStyle = "height: 0; padding: 0 15px; visibility: hidden;";
      setTimeout(() => {
        dropdownStyle = "height: 0; padding: 0 15px; visibility: hidden;";
        searchBarStyle = "border-radius: 5px;";
      }, 400)
      isDropdownUp = true;
    }
  }

  const handleInput = () => {
    filteredItems = recipiesArray.default.filter(item => item.itemName.toLowerCase().includes(inputValue.toLowerCase()));
    if (isDropdownUp && inputValue != '') {
      dropdownStyle = "height: 200px; padding: 12px 15px; visibility: visible; display: 100%;";
      searchBarStyle = "border-radius: 5px 5px 0 0;";
      isDropdownUp = false;
    }
	}
</script>

<div class="title-container"><h1 class="title">Slimefun thing</h1></div>
<div class="content">
            <div class="wrapper">
                    <div class="search-box">
                        <form autocomplete="off">
                            <input bind:value={inputValue} on:input={handleInput} on:focusin={dropdown} on:focusout={dropdown} style={searchBarStyle} class="item-select" type="text" placeholder="Search or type a Slimefun item">
                            <div class="item-list" style={dropdownStyle}>
                              {#each filteredItems as item}
                                <div class="list-item" id="1_">{item.itemName}</div>
                              {/each}
                            </div>
                            <br>
                        </form>
                        </div>
            </div>
</div>