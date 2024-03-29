(function () {
    Blockly.Blocks['define_command'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('Command Name:')
                //TODO: include reserved keywords
                .appendField(new Blockly.FieldTextInput('MyCommand', (text) => {
                    return text.replace(/^[\d_]+/g, '').split(/\s+/g).map((part) => {
                        return part.charAt(0).toUpperCase() + part.slice(1);
                    }).join('').replace(/[^A-Za-z\d_]/g, '');
                }), 'COMMAND_NAME');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(160);
            this.setTooltip('Defines a command.');
            // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        }
    };

    Blockly.BlockCFG.forBlock['define_command'] = (block, generator) => {
        const fieldValue = block.getFieldValue('COMMAND_NAME');

        return `cmd ${fieldValue}\n`;
    };
}());