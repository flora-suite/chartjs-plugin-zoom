import {callback as call} from 'chart.js/helpers';
import {doPan} from './core';
import {getEnabledScalesByPoint} from './utils';

export function handlePan(chart, state, e) {
  const delta = state.delta;
  if (delta !== null) {
    state.panning = true;
    doPan(chart, {x: e.deltaX - delta.x, y: e.deltaY - delta.y}, state.panScales);
    state.delta = {x: e.deltaX, y: e.deltaY};
  }
}

export function startPan(chart, state, e) {
  const {enabled, overScaleMode} = state.options.pan;
  if (!enabled) {
    return;
  }
  const rect = e.target.getBoundingClientRect();
  const point = {
    x: e.center.x - rect.left,
    y: e.center.y - rect.top
  };

  state.panScales = overScaleMode && getEnabledScalesByPoint(overScaleMode, point, chart);
  state.delta = {x: 0, y: 0};
  handlePan(chart, state, e);
}

export function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    setTimeout(() => (state.panning = false), 500);
    call(state.options.pan.onPanComplete, [{chart}]);
  }
}
